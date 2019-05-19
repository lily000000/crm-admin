<template>
  <el-form ref="form" :model="form" label-width="80px" class :disabled="readonly">
    <div class="from-wrap">
      <div>当前：{{xindex}}</div>
      <div class="input-wrap">
        <el-form-item label="科目名称">
          <el-input v-model="form.subjectName" style="width:200px" placeholder="请输入科目名称"></el-input>
        </el-form-item>
        <el-form-item label="科目满分">
          <el-input v-model="form.subjectScore" style="width:200px" placeholder="请输入科目满分"></el-input>
        </el-form-item>
      </div>
      <div class="input-wrap">
        <el-form-item label="学科基础">
          <el-input v-model="form.subjectBasis" style="width:200px" placeholder="请输入学科基础"></el-input>
        </el-form-item>
        <el-form-item label="当前水平">
          <el-input v-model="form.level" style="width:200px" placeholder="请输入当前水平"></el-input>
        </el-form-item>
      </div>
      <div class="input-wrap">
        <el-form-item label="薄弱模块">
          <el-input v-model="form.weakItem" style="width:200px" placeholder="请输入薄弱模块"></el-input>
        </el-form-item>
      </div>
      <div class="btn-wrap">
        <el-button @click="onDelete" v-if="inputWrapList.length>1">删除</el-button>
        <el-button @click="onAdd" v-if="xindex==inputWrapList.length-1">添加</el-button>
      </div>
    </div>
  </el-form>
</template>
<script>
import { watch } from "fs";
export default {
  props: {
    xindex: {
      type: Number
    },
    inputWrapList: {
      type: Array
    },
    readonly:{
      type:Boolean
    }
  },
  data() {
    return {
      labelPosition: "right",
      form: {
        childId:null,
        createUser:null,
        id:null,
        isDeleted:"",
        level:"",
        subjectBasis:"",
        subjectName:"",
        subjectScore:"",
        updateUser:"",
        weakItem:""
      }
    };
  },
  mounted(){
    this.$emit("onChange", this.form);
  },
  methods: {
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
.from-wrap {
  width: 580px;
  border-radius: 4px;
  background: #f4f4f4;
  padding-top: 10px;
  .input-wrap {
    display: flex;
    justify-content: flex-start;
  }
  .el-button--small {
    margin-left: 10px;
    margin-bottom: 10px;
  }
  .el-form-item--small .el-form-item {
    margin-left: 15px;
  }
  .btn-wrap {
    margin-bottom: 20px;
  }
}
</style>


