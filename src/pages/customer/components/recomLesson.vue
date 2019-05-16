<template>
  <el-form ref="form" :model="form" label-width="80px">
    <p class="addClass">追加课程</p>
    <div class="form-item">
      <el-form-item label="学习需求">
        <el-select v-model="form.gender" placeholder="请选择性别" style="width:90px" >
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学习期望">
        <el-select v-model="form.gender" placeholder="请选择性别" style="width:90px">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学习需求">
        <el-select v-model="form.gender" placeholder="请选择性别" style="width:90px" >
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学习期望">
        <el-select v-model="form.gender" placeholder="请选择性别" style="width:90px">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
    </div>
    <div class="form-item">
    </div>
    <div class="form-item">
      <el-form-item label="学情分析">
         <el-input type="text" v-model="form.desc" style="width:200px" placeholder="请输入学情分析"></el-input>
      </el-form-item>
      <el-form-item label="学情分析">
        <el-input type="text" v-model="form.desc" style="width:200px" placeholder="请输入学情分析"></el-input>
      </el-form-item>
    </div>
     <div class="form-item">
      <el-form-item label="学情分析">
         <el-input type="textarea" v-model="form.desc" style="width:600px" placeholder="请输入学情分析"></el-input>
          <p class="addClass">新增试听分析</p>
      </el-form-item>
     
    </div>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      form: {
        gender: "",
        desc: ""
      }
    };
  }
};
</script>
<style lang="scss" scoped>
.form-item {
  display: flex;
  justify-content: flex-start;
}
.addClass{
  text-align: right;
  color: #409EFF;
  margin-bottom: 10px;
  padding-top: 10px;
  padding-right: 10px;
}
form{
  background:rgb(244, 244, 244);
  margin-top: 10px;

}
</style>

