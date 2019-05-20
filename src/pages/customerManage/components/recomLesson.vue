<template>
  <el-form ref="form" :model="form" label-width="80px" class="from-wrap">
    <div class="add-class">
      <p>
        <span @click="onAddClass" v-show="xindex == classWrapList.length-1" class="superaddition">追加课程</span>
        <!-- <span @click="onDelete"  v-if="classWrapList.length>1">删除</span> -->
      </p>
    </div>
    <div class="form-item">
      <el-form-item label="类目">
        <el-select v-model="form.name1" placeholder="请选择" style="width:90px">
          <el-option label="英语类" value="男"></el-option>
          <el-option label="思维类" value="女"></el-option>
        </el-select>
      </el-form-item>
    </div>
    <div class="form-item">
      <el-form-item label="机构">
        <el-select v-model="form.name1" placeholder="请选择" style="width:90px">
          <el-option label="机构1" value="男"></el-option>
          <el-option label="机构2" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程">
        <el-select v-model="form.name2" placeholder="请选择" style="width:90px">
          <el-option label="课程1" value="男"></el-option>
          <el-option label="课程2" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input type="text" v-model="form.name6" style="width:90px" ></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.name4" placeholder="请选择" style="width:90px">
          <el-option label="未试听" value="男"></el-option>
          <el-option label="试听未报名" value="女"></el-option>
        </el-select>
      </el-form-item>
    </div>
    <div class="form-item">
      <el-form-item label="试听账号">
        <el-input type="text" v-model="form.name5" style="width:200px" placeholder="请输入试听账号"></el-input>
      </el-form-item>
      <el-form-item label="试听密码">
        <el-input type="text" v-model="form.name6" style="width:200px" placeholder="请输入试听密码"></el-input>
      </el-form-item>
    </div>
    <div class="form-item">
      <el-form-item label-width="15px">
        <div>试听分析记录</div>
        
        <div v-for="(item,index) in form.name7" :key="index" class="analyzetext">
          <p @click="onDelectAnalyze(index)" class="delect-item">删除</p>
          <el-input
            type="textarea"
            style="width:650px"
            v-model="form.name7[index]"
            placeholder="请输入试听分析记录"
            maxlength="30"
            show-word-limit
          ></el-input>
        </div>
        <!-- v-model="form.name7" -->

        <p class="add-class add-audition">
          <span @click="addAnalyze">新增试听分析</span>
        </p>
      </el-form-item>
    </div>
  </el-form>
</template>
<script>
export default {
  props: {
    classWrapList: {
      type: Array
    },
    xindex: {
      type: Number
    }
    // readonly:{
    //   type: Boolean
    // }
  },
  data() {
    return {
      form: {
        name1: "",
        name2: "",
        name3: "",
        name4: "",
        name5: "",
        name6: "",
        name7: [""]
      }
    };
  },
  methods: {
    onAddClass() {
      this.$emit("onAddClass");
    },
    addAnalyze() {
      this.form.name7.push("");
    },
    onDelectAnalyze(index){
      this.form.name7.splice(index, 1);

    },
   onDelete() {
      alert(2)
      this.$emit("onDelete");
    },
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
  background: rgb(244, 244, 244);
  margin-top: 10px;
  border-radius: 8px;
  .form-item {
    display: flex;
    justify-content: flex-start;
  }
  .add-class {
    text-align: right;
    color: #409eff;
    margin-bottom: 10px;
    padding-top: 10px;
    padding-right: 10px;
  }
  .add-audition {
    margin-bottom: 0px !important;
  }
  .analyzetext {
    margin-top: 10px;
  }
  .superaddition{
    margin-right: 20px;
  }
  .delect-item{
    text-align: right;
  }
}
</style>

