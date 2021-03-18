import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import GcErpDocLineMergeTable from "../../../components/Table/gc/GcErpDocLineMergeTable";
import EntityScanProperties from "./entityProperties/EntityScanProperties";

export default class GcErpDocLineMergeProperties extends EntityScanProperties{

    static displayName = 'GcErpDocLineMergeProperties';
    
    resetData = () => {
      this.setState({
        selectedRowKeys: [],
        selectedRows: [],
        tableData: [],
        loading: false,
        resetFlag: true
      });
      this.form.resetFormFileds();
    }

    queryData = (whereClause) => {
      const self = this;
      let requestObject = {
        tableRrn: this.state.tableRrn,
        whereClause: whereClause,
        success: function(responseBody) {
          self.setState({
            tableData: responseBody.dataList,
            loading: false
          });
        }
      }
      TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }


    buildTable = () => {
        return <GcErpDocLineMergeTable 
                            table={this.state.table} 
                            pagination={true}
                            rowKey={this.state.rowKey} 
                            data={this.state.tableData} 
                            loading={this.state.loading}
                            resetData={this.resetData.bind(this)}
                            onSearch={this.queryData.bind(this)} 
                            resetFlag={this.state.resetFlag} />
    }

    
}