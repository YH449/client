import EntityListTable from "@components/framework/table/EntityListTable";
import { Button } from 'antd';
import I18NUtils from '@api/utils/I18NUtils';
import { i18NCode } from '@api/const/i18n';
import TableManagerRequest from '@api/table-manager/TableManagerRequest';
import TableObject from '@api/dto/ui/Table';
import IconUtils from '@api/utils/IconUtils';
import TransferMLotInventoryDialog from '@components/mms/dialog/TransferMLotInventoryDialog';
import MaterialLotInvManagerRequest from '@api/material-lot-inv-manager/MaterialLotInvManagerRequest';
import CheckMLotInventoryDialog from '@components/mms/dialog/CheckMLotInventoryDialog';
import VcMaterialLotInventoryRequest from "@api/vc/material-lot-inventory-manager/VcMaterialLotInventoryRequest";
import NoticeUtils from "@utils/NoticeUtils";

const TableName = {
    MLotTransferInventory: "MMLotTransferInv",
    MLotInvCheck: "MMLotInvCheck"
}

export default class VcMaterialLotInventoryScanTable extends EntityListTable {

    static displayName = 'VcMaterialLotInventoryScanTable';

    constructor(props) {
        super(props);
        this.state = {...this.state};
    }

    createButtonGroup = () => {
      
    }

    getRowClassName = (record, index) => {
        if(record.rowClass){
            return 'ban-row';
        }else if(record.scaned) {
            return 'scaned-row';
        }else {
            if(index % 2 ===0) {
                return 'even-row'; 
            } else {
                return ''; 
            }
        }
    }

    getScanned = () => {
        let datas = this.state.data ;
        let scanned = [];
        if(datas){
            datas.forEach(data => {
                if(data.scaned){
                    scanned.push(data) ;
                }
            })
        }
        return scanned ;
    }

    createForm = () => {
        let childrens = [];
        childrens.push(<CheckMLotInventoryDialog key={CheckMLotInventoryDialog.displayName} ref={this.formRef} object={this.state.mLotInventory} visible={this.state.checkMLotInvFormVisible} 
                            table={this.state.checkMLotInventoryTable} onOk={this.handleCheckOk} onCancel={this.handleCancelCheck} />);                                   
            
        return childrens;
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createPickButton());
        buttons.push(this.createExportDataButton());
        return buttons;
    }

    createPickButton = () => {
        return <Button key="pick" type="primary" className="table-button" onClick={this.handlePick}>
                        {IconUtils.buildIcon("icon-lingliao")}{I18NUtils.getClientMessage(i18NCode.BtnPick)}
                    </Button>
    }
    
    /**
     * 领料
     */
    handlePick = () => {
        var self = this;
        let scanedObject = self.getScanned();
        if(scanedObject.length === 0){
            NoticeUtils.showInfo(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow))
            return;
        }
        let object = {
            mLotInventorys: scanedObject,
            success: function() {
                self.refreshDelete(scanedObject);
            }
        };
        VcMaterialLotInventoryRequest.sendPickRequest(object);
    }

    /**
     * 盘点
     */
    buildOperation = (record) => {
        let operations = [];
        operations.push(this.buildCheckButton(record));
        return operations;
    }

    buildCheckButton = (record) => {
        return <Button key="check" style={{marginRight:'1px'}} onClick={() => this.handleCheck(record)} size="small" href="javascript:;">
                     {IconUtils.buildIcon("icon-pandian")}
                </Button>;
    }

    /**
     * 盘点。
     */
    handleCheck = (record) => {
        let self = this;
        let requestObject = {
            name: TableName.MLotInvCheck,
            success: function(responseBody) {
                let table = responseBody.table;
                let transferInv = TableObject.buildDefaultModel(table.fields, record);
                self.setState({
                    checkMLotInventoryTable: responseBody.table,
                    mLotInventory: transferInv,
                    checkMLotInvFormVisible : true
                });
            }
        }
        TableManagerRequest.sendGetByNameRequest(requestObject);
    }

    handleCheckOk = (materialLotInventory) => {
        this.setState({
            checkMLotInvFormVisible : false
        });
        if (materialLotInventory) {
            this.refresh(materialLotInventory);
        } else {
            this.refreshDelete(this.state.mLotInventory);
        }
       
    }

    handleCancelCheck = () => {
        this.setState({
            checkMLotInvFormVisible : false
        });
    }

}