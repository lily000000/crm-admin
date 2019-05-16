<template>
  <el-dialog
    :title="tagTitle"
    :visible="delVisible"
    width="500px"
    @close="onCancel('form')"
    left
    v-if="delVisible"
  >
    <div class="del-dialog-cnt">
      <p class="toast-tilte" v-if="tagTitle =='批量打标签'">
        所有被选中的
        <span>88</span>位客户 将批量添加标签
      </p>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标签对象" prop="radio" v-if="tagCompilations">
          <el-radio-group v-model="form.radio">
            <el-radio :label="3">孩子</el-radio>
            <el-radio :label="6">家长</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标签名称" prop="value5">
          <el-select
            v-model="form.value5"
            multiple
            placeholder="请选择"
            filterable
            @change="onTageChose(form.value5)"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="已选标签" class="tag-item">
          <div>
            <el-button
              type="danger"
              plain
              v-for="(item,index) in tagItem"
              :key="item"
              class="btn-item"
              @click="delBtn(index)"
            >
              {{item}}
              <i class="el-icon-error el-icon--right"></i>
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onCancel('form')">取 消</el-button>
      <el-button type="primary" @click="onConfirm('form')">确 定</el-button>
    </span>
  </el-dialog>
  
</template>
<script>
export default {
  props: {
    delVisible: {
      type: Boolean
    },
    tagTitle: {
      type: String
    },
    tagCompilations: {
      type: Boolean
    }
  },
  data() {
    return {
      tagItem: [],
      options: [
        {
          value: "黄金糕",
          label: "黄金糕"
        },
        {
          value: "双皮奶",
          label: "双皮奶"
        },
        {
          value: "蚵仔煎",
          label: "蚵仔煎"
        },
        {
          value: "龙须面",
          label: "龙须面"
        },
        {
          value: "北京烤鸭",
          label: "北京烤鸭"
        }
      ],
      form: {
        name: "",
        region: "",
        options: "",
        radio: 3,
        value5: []
      }
    };
  },
  mounted() {},
  methods: {
    onTageChose(value5) {
      this.tagItem = value5;
      console.log(value5);
    },
    delBtn(e) {
      console.log(e);
      this.tagItem.splice(e, 1);
    },
    onConfirm(form) {
      if(this.form.value5==''){
        this.$message.error('请选择标签名称');
      }else{
        this.$emit("tagConfirm", this.tagItem);
        this.resetForm(form);
      } 
    },
    onCancel(form) {
      this.resetForm(form);
      this.$emit("onCancel");
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.tagItem = [];
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./style.scss";
</style>

