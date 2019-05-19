<template>
  <el-form
    ref="form"
    :model="form"
    label-width="80px"
    :label-position="labelPosition"
    :disabled="readonly"
  >
    <p class="subject">基本信息</p>
    <div class="form-item">
      <el-form-item label="孩子姓名">
        <el-input v-model="form.name" style="width:200px" placeholder="请输入家长姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="form.sex" placeholder="请选择性别" style="width:200px">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学生年级" label-width="100px">
        <el-select v-model="form.grade" placeholder="请输入学生年级" style="width:200px">
          <el-option label="一年级" value="一年级"></el-option>
          <el-option label="二年级" value="二年级"></el-option>
        </el-select>
      </el-form-item>
    </div>
    <div class="form-item">
      <el-form-item label="城市级联">
        <el-cascader :options="options_1" v-model="form.city" style="width:200px" :props="cityProps"></el-cascader>
      </el-form-item>
      <el-form-item label="性格类型">
        <el-select v-model="form.personality" placeholder="请选择性格类型" style="width:200px">
          <el-option label="害羞" value="害羞"></el-option>
          <el-option label="开朗" value="开朗"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="兴趣爱好" label-width="100px">
        <el-input v-model="form.hobby" style="width:200px" placeholder="请输入兴趣爱好"></el-input>
      </el-form-item>
    </div>
    <el-form-item label="备注">
      <el-input type="textarea" v-model="form.comments" style="width:200px"></el-input>
    </el-form-item>
    <el-form-item label="标签">
      <div>
        <el-button
          type="danger"
          plain
          v-for="(item,index) in childTagItem"
          :key="index"
          class="btn-item"
          @click="parentDelBtn(index)"
        >
          {{item}}
          <i class="el-icon-error el-icon--right"></i>
        </el-button>
        <el-button type="primary" plain @click="onChildeTag">
          打标签
          <i class="el-icon-plus el-icon--right"></i>
        </el-button>
      </div>
    </el-form-item>

    <p class="subject" style="margin-top:30px;">科目信息</p>
    <input-wrap
      v-for="(item,index) in form.subjectList"
      :xindex="index"
      :key="'input-'+index"
      :readonly="readonly"
      @onChange="(value)=>inputChange(value,index)"
      @onAdd="onAdd"
      @onDelete="(value)=>onDelete(value,index)"
      :inputWrapList="form.subjectList"
    />

    <p class="subject" style="margin-top:30px;">培训经历</p>
    <training-record
      v-for="(item,index) in form.trainingList"
      :key="index+1"
      :tindex="index"
      :readonly="readonly"
      @onChange="(value)=>trainingChange(value,index)"
      @onAddTrain="onAddTrain"
      @onDeleteTrain="(value)=>onDeleteTrain(value,index)"
      :traingWrapList="form.trainingList"
    ></training-record>
    <tag-toast
      :delVisible="delVisible"
      :tagTitle="tagTitle"
      @onCancel="onCancel"
      @tagConfirm="tagConfirm"
      :tagCompilations="tagCompilations"
    ></tag-toast>
  </el-form>
</template>
<script>
import tagToast from "components/tagToast/index.vue";
import inputWrap from "components/inputWrap/index.vue";
import trainingRecord from "components/trainingRecord/index.vue";
export default {
  components: {
    tagToast,
    inputWrap,
    trainingRecord
  },
  props: {
    options: {
      type: Array
    },
    readonly:{
      type:Boolean
    },
    title:{
      type:String
    },
  },
  data() {
    return {
      options_1: [],
      labelPosition: "right",
      delVisible: false,
      tagTitle: "打标签",
      tagCompilations: false,
      childTagItem: [],
      cityProps: {
        value: "id",
        label: "name",
        children: "areaList"
      },
      form: {
        subjectList: [{}],
        trainingList: [{}],
        hobby: "",
        name: "",
        id: 0, //孩子编号
        isDeleted: false, //是否删除
        sex: "",
        resource: 3,
        comments: "",
        habit: "", //学习习惯
        grade: "",
        city: [], //所在地
        personality: "" //性格
      },
      rules: {
        chatName: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    form: {
      handler: function(newVal, oldVal) {
        this.$emit("onChange", newVal);
      },
      deep: true
    },
    options: {
      handler: function(newVal, oldVal) {
        this.options_1 = [...newVal];
      },
      deep: true
    }
  },
  mounted() {
    this.$emit("onChange", this.form);
  },
  methods: {
    onSubmit() {
      console.log(this.form);
    },
    radioChange(e) {
      console.log(e);
    },
    onChildeTag() {
      alert(1);
      this.delVisible = true;
    },
    onCancel() {
      this.delVisible = false;
    },
    tagConfirm(tagArry) {
      this.delVisible = false;
      this.childTagItem = this.childTagItem.concat(tagArry);
    },
    parentDelBtn(index) {
      this.childTagItem.splice(index, 1);
    },
    inputChange(value, index) {
      this.form.subjectList[index] = value;
    },
    onAdd() {
      this.form.subjectList = [...this.form.subjectList, {}];
    },
    onDelete(value, index) {
      let newList = [...this.form.subjectList];
      newList.splice(parseInt(index), 1);
      this.form.subjectList = newList;
    },
    trainingChange(value, index) {
      this.form.trainingList[index] = value;
    },
    onAddTrain() {
      this.form.trainingList = [...this.form.trainingList, {}];
    },
    onDeleteTrain(value, index) {
      let newList = [...this.form.trainingList];
      newList.splice(parseInt(index), 1);
      this.form.trainingList = newList;
    }
  }
};
</script>
<style lang="scss" scoped>
.form-item {
  display: flex;
  justify-content: flex-start;
}
.el-form-item__content {
  width: 200px;
}
.el-input--small .el-input__inner {
  width: 200px !important;
}
.warn {
  color: #f56c6c;
}
.customertite {
  color: #606266;
  margin-bottom: 10px;
}
.serial {
  margin-left: 30px;
}
.subject {
  color: #409eff;
  margin-bottom: 10px;
  font-weight: bold;
}
</style>

