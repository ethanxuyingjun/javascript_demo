<template>
  <div id="addressTable">
  <el-table
    ref="multipleTable"
    :data="addressData"
    tooltip-effect="dark"
    stripe
    style="width: 100%"
    @selection-change="handleSelectionChange"
    >
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="id"
      label="ID"
      sortable
      width="100">
    </el-table-column>

    <el-table-column
      prop="name"
      sortable
      :label= "$t('address.name')">
    </el-table-column>

    <el-table-column
      prop="location"
      sortable
      :label="$t('address.location')">
    </el-table-column>

    <el-table-column
      prop="office"
      sortable
      :label="$t('address.office')">
    </el-table-column>

    <el-table-column :label="$t('address.phone')" align="center">
        <el-table-column
          prop="officePhone"
          sortable
          :label="$t('address.officePhone')">
        </el-table-column>
        <el-table-column
          prop="cellPhone"
          sortable
          :label="$t('address.cellPhone')"
          >
            <template slot-scope="{row,$index}" >
              <template v-if="row.edit">
                <input class="edit-cell" v-model="row.cellPhone" @keyup.enter="submitEdit(row,$index)">
              </template>
              <div v-else @dblclick="handleEdit(row,$index)">{{row.cellPhone}}</div>
          </template>
        </el-table-column>
    </el-table-column>

  </el-table>
  <el-row style="margin-top: 20px" type="flex" class="row-bg" justify="space-between">
    <el-col :span="12" align="left"><el-button v-bind:disabled="multipleSelection.length>0?false:true" type="danger" icon="el-icon-delete" circle @click="handleDelete()"></el-button></el-col>
    <el-col :span="12" align="right">
      <el-button type="primary" icon="el-icon-edit" round v-bind:disabled="multipleSelection.length>1 || multipleSelection.length===0?true:false" @click="handleUpdate()">Update</el-button>
      <el-button type="primary" icon="el-icon-plus" round @click="handleAdd()">Add</el-button>
    </el-col>
  </el-row>

  <el-dialog
  title="Update Address"
  :visible.sync="dialogVisible"
  width="35%"
  :before-close="handleClose">
    <el-form ref="form" :model="selAddress" label-width="100px">
      <el-form-item label="Name">
        <el-input v-model="selAddress.name"></el-input>
      </el-form-item>
    </el-form-item>
      <el-form-item label="Location">
        <el-select v-model="selAddress.location" placeholder="select location" style="display: block;">
          <el-option label="Shanghai" value="Shanghai"></el-option>
          <el-option label="Beijing" value="Beijing"></el-option>
        </el-select>
      </el-form-item>
    
      <el-form-item label="Office">
          <el-input v-model="selAddress.office"></el-input>
      </el-form-item>

      <el-form-item label="Office Phone">
          <el-input v-model="selAddress.officePhone"></el-input>
      </el-form-item>
       <el-form-item label="Cell Phone">
        <el-input v-model="selAddress.cellPhone"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">Cancel</el-button>
    <el-button type="primary" @click="modifyAddress">Apply</el-button>
  </span>
  </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'address-view',

  data() {
      return {
        dialogVisible: false,
        selAddress: {},
        showEdit: [], //显示编辑框
        addressData: [],
        multipleSelection: []
      }
    },

    mounted () {
      this.$http({
      method: "get",
      url: "/static/data/demo.json",
      dataType: "json",
      crossDomain: true,
      cache: false
      }).then(resolve => {
          this.addressData = resolve.data.map(v => {
          this.$set(v, 'edit', false)
          return v
        })
      }),
      reject => {
        console.log("request fail", reject);
      };
    },

    methods: {
      handleDelete() {
        this.multipleSelection.forEach(item => {
            this.addressData.splice(this.addressData.indexOf(item),1);
        });
      },
      handleUpdate() {
          this.dialogVisible = true;
          this.selAddress = this.multipleSelection[0];
      },
      modifyAddress() {
        this.multipleSelection[0] = this.selAddress;
        this.addressData.splice(this.addressData.indexOf(this.multipleSelection[0]),1, this.multipleSelection[0]);
        this.dialogVisible = false;
      },
      handleAdd() {
        let newId;
        newId = this.addressData[this.addressData.length-1].id + 1;
        this.addressData.push({
            id: newId
        })

      },
      handleEdit(row, index) {
          row.edit = true;
      },
      submitEdit(row, index) {
          row.edit = false;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      handleClose(done) {
        this.$confirm('Are you sure to close it?')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
}
</script>

<style >
</style>
