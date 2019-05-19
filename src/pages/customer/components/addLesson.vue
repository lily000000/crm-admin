<template>
  <el-dialog title="跟进记录" :visible="lessonToast" width="750px" left @close="closeClassDialog">
    <div class="del-dialog-cnt">
      <el-form ref="form" :model="form" label-width="120px" :disabled="readonly">
        <div class="form-item">
          <el-form-item label="学习需求">
            <el-select v-model="form.gender" placeholder="请选择性别" style="width:200px">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学习期望">
           <el-input type="text" v-model="form.name6" style="width:200px" placeholder="请输入试听密码"></el-input>
          </el-form-item>
        </div>
        <div class="form-item">
          <el-form-item label="一节课支付能力">
            <el-select v-model="form.gender" placeholder="请选择性别" style="width:200px">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="form-item">
          <el-form-item label="学情分析">
            <el-input type="textarea" v-model="form.desc" style="width:200px" placeholder="请输入学情分析"></el-input>
          </el-form-item>
        </div>
        <P>推荐课程</P>
        <recom-lesson
          v-for="(item,index) in classWrapList"
          :xindex="index"
          :key="'input-'+index"
          @onChange="(value)=>onClassChange(value,index)"
          @onAddClass="onAddClass"
          :classWrapList="classWrapList"
        ></recom-lesson>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button>取 消</el-button>
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
      classWrapList: [{}],
      form: {}
    };
  },
  mounted() {
    // console.log("2222", this.lessonstate);
  },
  methods: {
    onAddClass() {
      alert(1);
      this.classWrapList = [...this.classWrapList, {}];
      console.log("哈哈", this.classWrapList);
    },
    onClassChange(value, index) {
      this.classWrapList[index] = value;
      console.log(this.classWrapList);
    },
    closeClassDialog() {}
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

