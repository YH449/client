import { Application } from '@api/Application';
import IssueOrderRequest from '@api/issue-order-manager/issue-lot-order/IssueOrderRequest';
import RefListManagerRequest from '@api/ref-list-manager/RefListManagerRequest';
import TableManagerRequest from '@api/table-manager/TableManagerRequest';
import { i18NCode } from '@const/i18n';
import I18NUtils from '@utils/I18NUtils';
import NoticeUtils from '@utils/NoticeUtils';
import CreateIssueOrderDialog from '../dialog/CreateIssueOrderDialog';
import CreateMLotDialog from '../dialog/CreateMLotDialog';
import PrintIssueOrderDialog from '../dialog/PrintIssueOrderDialog';
import CreateIssueOrderByMaterialInfoTable from './CreateIssueOrderByMaterialInfoTable';

/**
 * 创建指定批次及数量发料单
 */
export default class CreateIssueOrderByMLotInfoTable extends CreateIssueOrderByMaterialInfoTable {

    static displayName = 'CreateIssueOrderByMLotInfoTable';

    openCreateIssueOrderDialog = (dataList) => {
        let self = this;
        let requestObject = {
            name: this.props.createDeptIssueActionTableName, 
            success: function(responseBody) {
                self.setState({
                    createIssueOrderObject: {materialLots: dataList},
                    createIssueOrderVisible: true,
                    createIssueOrderActionTable: responseBody.table
                });  
            }
        }
        TableManagerRequest.sendGetByNameRequest(requestObject); 
    }

    // handleCreatePick = () =>{
    //     let self = this ;
    //     let {data} = self.state;
    //     if(data.length == 0){
    //         NoticeUtils.showInfo(I18NUtils.getClientMessage(i18NCode.SelectOneRow));
    //         return;
    //     }
    //     let nullPickQtyFlag = false;
    //     data.map((d, index)=>{
    //         if(d.pickQty == null){
    //             nullPickQtyFlag = true;
    //         }
    //     })

    //     if(nullPickQtyFlag){
    //         NoticeUtils.showInfo(I18NUtils.getClientMessage("领料数量不能为空"));
    //         return;
    //     }
    //     let requestObject = {
    //         name: this.props.createDeptIssueActionTableName, 
    //         success: function(responseBody) {
    //             self.setState({
    //                 createIssueOrderObject: {materialLots: data},
    //                 createIssueOrderVisible: true,
    //                 createIssueOrderActionTable: responseBody.table
    //             });  
    //         }
    //     }
    //     TableManagerRequest.sendGetByNameRequest(requestObject); 

    //     // let objectRequest = {
    //     //     materialLots : data,
    //     //     success: function(responseBody){
    //     //         self.setState({
    //     //             formPrintVisible: true,
    //     //             formPrintObject:data,
    //     //             document:responseBody.document,
    //     //         })
    //     //     }
    //     // }
    //     // IssueOrderRequest.sendCreateIssueMLotOrderRequest(objectRequest);
    // }

    createForm = () => {
        let childrens = [];
        childrens.push(<CreateMLotDialog key={CreateMLotDialog.displayName} ref={this.formRef} object={this.state.editorObject} visible={this.state.formVisible} 
                                                        table={this.state.table} onOk={this.refresh} onCancel={this.handleCancel} />);                               
        childrens.push(<PrintIssueOrderDialog key={PrintIssueOrderDialog.displayName} document={this.state.document} object={this.state.formPrintObject} 
                                            visible={this.state.formPrintVisible} costCenter={this.state.costCenter} onOk={this.printOk} onCancel={this.printCancel}/>)
        childrens.push(<CreateIssueOrderDialog key={CreateIssueOrderDialog.displayName} object={this.state.createIssueOrderObject}  table={this.state.createIssueOrderActionTable} 
                visible={this.state.createIssueOrderVisible} onOk={this.createIssueOrderOk} onCancel={this.createIssueOrderCancel}/>)
        return childrens;
    }

    createIssueOrderOk = (dialogObject) => {
        let self =this;
        let objectRequest = {
            materialLots: dialogObject.materialLots,
            actionComment: dialogObject.actionComment,
            success: function(responseBody){
                self.setState({
                    createIssueOrderObject: {},
                    createIssueOrderVisible: false,
                    formPrintVisible: true,
                    formPrintObject: dialogObject.materialLots,
                    document: responseBody.document,
                    costCenter: responseBody.costCenter,
                });
            }
        }
        IssueOrderRequest.sendCreateIssueMLotOrderRequest(objectRequest);   
    }

}