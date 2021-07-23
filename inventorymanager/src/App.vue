<template>
  <div id="app">
    <div>
      <q-bar>Adventurers of Primonterra</q-bar>
    </div>
    <div class="row justify-center">
      <h1>Inventory Manager</h1>
    </div>
    <div class="row justify-center inputs">
      <q-input label="Item" v-model="newitem" class="inputbox" outlined></q-input>
      <q-input type="number" label="Quantity" v-model="quantity" class="input2" color="secondary" outlined></q-input>
      <q-btn color="primary" @click="appenditem" class="submit" :disabled="quantity < 1 || newitem.length < 1" no-caps>Add Item</q-btn>
    </div>
    <div class="column items">
      <q-list>
        <div v-for="(item, index) in array" :key="index" class="row justify-start items-center">
          <div class="addbuttons">
            <q-btn color="positive" class="add" @click="additem(index, item)">+</q-btn>
          </div>
          <div class="addbuttons">
            <q-btn color="negative" class="remove" @click="removeitem(index, item)">-</q-btn>
          </div>
            <b>&nbsp;&nbsp;&nbsp;{{ item.text }}&nbsp;&nbsp;&nbsp;</b>
            <q-badge color="primary">x{{item.quantity}}</q-badge>
          </div>
      </q-list>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LayoutDefault',
  components: {
  },
  data () {
    return {
      newitem: "",
      quantity: null,
      array: [],
    }
  },
   methods: {
    appenditem: function() {
          this.array.push({text: this.newitem, quantity: this.quantity});
          this.quantity = null;
          this.newitem = "";
    },
    removeitem: function(index, item) {
      if (item.quantity > 1){
      item.quantity--;
      }
      else {
        this.array.splice(index, 1);
      }
    },
    additem: function(index, item) {
     item.quantity++;
    },
  }
}
</script>
<style>
.items {
  padding-top: 10px;
  max-height: 20%;
}
.inputs {
  padding-bottom: 30px;
  border-bottom: 3px solid gray;
}
.addbuttons {
  padding-left: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.inputbox {
  max-width: 20%;
  padding-right: 10px;
}
.input2 {
  max-width: 8%;
  padding-right: 10px;
}
</style>