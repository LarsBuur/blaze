
UI.Each = Component.extend({
  typeName: 'Each',
  render: function (buf) {
    // do nothing, all in rendered().

    // XXX do something for server-side rendering
  },
  rendered: function () {
    var self = this.__component__;

    // XXX find `content` via `get()`...
    // XXX content kind reactively changes?
    var content = self.content;
    if (typeof content === 'function')
      content = _.bind(content, self);

    var range = self.dom;

    ObserveSequence.observe(function () {
      return self.get();
    }, {
      addedAt: function (id, item, i, beforeId) {
        id = LocalCollection._idStringify(id);

        var data = item;
        var dep = new Deps.Dependency;

        // XXX dynamically rendering a child component
        // shouldn't be this hard...
        var comp = UI.render(
          content,
          // XXX emulate hypothetical
          // node.$ui.data() API
          { data: _extend(
          function () {
            dep.depend();
            return data;
          }, {
            $set: function (v) {
              data = v;
              dep.changed();
            }
          }) }, self);

        if (beforeId)
          beforeId = LocalCollection._idStringify(beforeId);
        range.add(id, comp, beforeId);
      },
      removed: function (id, item) {
        range.remove(LocalCollection._idStringify(id));
      },
      movedTo: function (id, item, i, j, beforeId) {
        range.moveBefore(
          LocalCollection._idStringify(id),
          beforeId && LocalCollection._idStringify(beforeId));
      },
      changed: function (id, newItem) {
        range.get(LocalCollection._idStringify(id)).data.$set(newItem);
      }
    });
  }
});
