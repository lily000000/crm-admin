<template>
  <el-dialog title="新增推课" :visible="lessonToast" width="750px" left @close="onCancel('form')">
    <div class="del-dialog-cnt">
      <el-form ref="form" :model="form" label-width="120px" :disabled="readonly">
        <div class="form-item">
          <el-form-item label="学习需求" prop="gender">
            <el-select v-model="form.gender" placeholder="请选择性别" style="width:200px">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学习期望" prop="name6">
           <el-input type="text" v-model="form.name6" style="width:200px" placeholder="请输入试听密码"></el-input>
          </el-form-item>
        </div>
        <div class="form-item">
          <el-form-item label="一节课支付能力" prop="gender">
            <el-select v-model="form.gender" placeholder="请选择性别" style="width:200px">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="form-item">
          <el-form-item label="学情分析" prop="desc">
            <el-input type="textarea" v-model="form.desc" style="width:200px" placeholder="请输入学情分析"></el-input>
          </el-form-item>
        </div>
        <P>推荐课程</P>
        <recom-lesson
          v-for="(item,index) in form.classWrapList"
          :xindex="index"
          :key="'input-'+index"
          @onChange="(value)=>onClassChange(value,index)"
          @onDelete="(value)=>onDelete(value,index)"
          @onAddClass="onAddClass"
          :classWrapList="form.classWrapList"
        ></recom-lesson>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onCancel('form')">取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import recomLesson from "../components/recomLesson";
import { constants } from "crypto";
export default {
  components: {
    recomLesson
  },
  props: {
    lessonToast: {
      type: Boolean
    },
    lessonstate: {
      type: Boolean
    }
  },
  data() {
    return {
      readonly: false,
   
      form: {
        gender:"",
        name6:"",
        desc:"",
        classWrapList: [{}]
      }
    };
  },
  mounted() {
    // console.log("2222", this.lessonstate);
  },
  methods: {
    onAddClass() {
      this.form.classWrapList = [...this.form.classWrapList, {}];
      console.log("哈哈", this.form.classWrapList);
    },
    onDelete(value, index) {
      let newList = [...this.form.classWrapList];
      newList.splice(parseInt(index), 1);
      this.form.classWrapList = newList;
    },
    onClassChange(value, index) {
      this.classWrapList[index] = value;
      console.log(this.classWrapList);
    },
    onCancel(form) {
        this.resetForm(form);
        this.$emit("onCancel");
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
.addRecord {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.release {
  width: 90px;
}
.el-timeline {
  margin-top: 10px;
  padding-top: 15px;
}
.form-item {
  display: flex;
  justify-content: flex-start;
}
</style>

