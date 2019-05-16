<template>
  <el-form ref="form" :model="form" label-width="80px" class>
    <!-- <div>当前：{{xindex}}</div> -->
    <div class="input-wrap">
      <el-form-item label="科目名称">
        <el-input v-model="form.name1" style="width:200px" placeholder="请输入科目名称"></el-input>
      </el-form-item>
      <el-form-item label="科目满分">
        <el-input v-model="form.name2" style="width:200px" placeholder="请输入科目满分"></el-input>
      </el-form-item>
    </div>
    <div class="input-wrap">
      <el-form-item label="学科基础">
        <el-input v-model="form.name3" style="width:200px" placeholder="请输入学科基础"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="form.name4" style="width:200px" placeholder="请输入当前水平"></el-input>
      </el-form-item>
    </div>
    <div class="input-wrap">
      <el-form-item label="薄弱模块">
        <el-input v-model="form.name5" style="width:200px" placeholder="请输入薄弱模块"></el-input>
      </el-form-item>
    </div>
    <div class="btn-wrap">
      <el-button @click="onDelete" v-if="inputWrapList.length>1">删除</el-button>
      <el-button @click="onAdd" v-if="xindex==inputWrapList.length-1">添加</el-button>
    </div>
  </el-form>
</template>
<script>
import { watch } from "fs";
export default {
  props: {
    xindex:{
      type:Number
    },
    inputWrapList: {
      type: Array
    }
  },
  data() {
    return {
      labelPosition: "right",
      form: {
        name1: "",
        name2: "",
        name3: "",
        name4: "",
        name4: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    onDelete() {
      this.$emit("onDelete");
    },
    onAdd() {
      this.$emit("onAdd");
    }
  },
  watch: {
    form: {
      deep: true,
      handler: function(val) {
        this.$emit("onChange", val);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.input-wrap {
  display: flex;
  justify-content: flex-start;
}
.el-form-item--small .el-form-item {
  margin-left: 15px;
}
.btn-wrap{
  margin-bottom: 20px;
}
</style>


