const List = require('../models/list');

class ListRepository {

    constructor(model) {
        this.model = model;
      }

      createList(title) {
        const newList = { title };
        const list = new this.model(newList);
    
        return list.save();
      }
    
      findAll() {
        return this.model.find();
      }

      findById(id) {
        return this.model.findById(id);
      }

      deleteById(id) {
        return this.model.findByIdAndDelete(id);
      }

      updateById(id, object) {
        const query = { _id: id };
        return this.model.findOneAndUpdate(query, { $set: { title: object.title, createdAt: object.createdAt } });
      }
    
}

module.exports = new ListRepository(List);