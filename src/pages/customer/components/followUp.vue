<template>
  <el-dialog
    title="跟进记录"
    :visible="followUptoast"
    width="500px"
    left
    @close="onCancel('form')"
  >
    <div class="del-dialog-cnt">
      <el-form ref="form" :model="form" label-width="80px">
        <div class="addRecord">
          <p>新建跟进记录</p>
          <el-button type="primary" class="release">发布</el-button>
        </div>
        <el-form-item label="标签对象" prop="cont">
          <el-input type="textarea" v-model="form.cont" class="text-cont"></el-input>
        </el-form-item>
      </el-form>
      <el-timeline>
        <el-timeline-item timestamp="2018/4/12" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/12 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/3" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/3 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/2" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/2 20:46</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
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
    followUptoast: {
      type: Boolean
    },
    form: {
      type: Object
    }
  },
  data() {
    return {
      followToast: true
    };
  },
  methods: {
    onConfirm(form) {
        alert(this.form.cont)
      if (this.form.value5 == "") {
        this.$message.error("请选择标签名称");
      } else {
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
</style>

