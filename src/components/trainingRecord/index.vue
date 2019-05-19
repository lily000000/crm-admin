<template>
  <el-form ref="form" :model="form" label-width="80px" :disabled="readonly" class>
    <!-- <div>当前：{{xindex}}</div> -->
    <div class="form-wrap">
      <div class="input-wrap">
        <el-form-item label="培训机构">
          <el-input v-model="form.institution" style="width:200px" placeholder="请输入培训机构"></el-input>
        </el-form-item>
        <el-form-item label="培训科目">
          <el-input v-model="form.subject" style="width:200px" placeholder="请输入培训科目"></el-input>
        </el-form-item>
      </div>
      <div class="input-wrap">
        <el-form-item label="培训课程">
          <el-input v-model="form.course" style="width:200px" placeholder="请输入培训课程"></el-input>
        </el-form-item>
        <el-form-item label="培训时长">
          <el-input v-model="form.duration" style="width:200px" placeholder="请输入培训时长"></el-input>
        </el-form-item>
      </div>
      <div class="btn-wrap">
        <el-button @click="onDeleteTrain" v-if="traingWrapList.length>1">删除</el-button>
        <el-button @click="onAddTrain" v-if="tindex==traingWrapList.length-1">添加</el-button>
      </div>
    </div>
  </el-form>
</template>
<script>
import { watch } from "fs";
export default {
  props: {
    tindex: {
      type: Number
    },
    readonly:{
      type:Boolean
    },
    traingWrapList: {
      type: Array
    }
  },
  data() {
    return {
      labelPosition: "right",
      form: {
        childId:null,
        id:null,
        course:"",
        createUser:null,
        institution:"",
        isDeleted:"",
        duration:"",
        subject:"",
        updateUser:"",
      }
    };
  },
  mounted(){
    this.$emit("onChange", this.form);
  },
  methods: {
    onDeleteTrain() {
      this.$emit("onDeleteTrain");
    },
    onAddTrain() {
      this.$emit("onAddTrain");
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
.form-wrap {
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


