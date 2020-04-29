import EntityListTable from "../EntityListTable";
import { Button, Tag, Input } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import { Notification } from '../../notice/Notice';
import { PrintServiceUrl } from '../../../api/gc/GcConstDefine';
import MessageUtils from "../../../api/utils/MessageUtils";
import EventUtils from "../../../api/utils/EventUtils";
import PrintUtils from '../../../api/utils/PrintUtils';
import IncomingDeleteRequest from "../../../api/gc/incomingDelete-manager/IncomingDeleteRequest";
import GetPrintWltVboxParameterRequest from "../../../api/gc/get-print-wltbox-parameter/GetPrintWltBoxParameterRequest";

const TableName = {
    IncomingMLotDelete: "GCIncomingMLotDeleteTable"
}

export default class GCIncomingMLotDeleteTable extends EntityListTable {

    static displayName = 'GCIncomingMLotDeleteTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createDeleteButton());
        buttons.push(this.createPrintButton());
        return buttons;
    }
    
    createTagGroup = () => {
        let tags = [];
        tags.push(this.createDeleteRemarkInput());
        tags.push(this.createStatistic());
        tags.push(this.createTotalNumber());
        return tags;
    }

    createDeleteRemarkInput = () => {
        return <div style={styles.input}>
            <Input ref={(input) => { this.input = input }} key="deleteNote" placeholder="删除备注" />
        </div>
    }

    deleteData =() => {
        const {data,table} = this.state;
        let self = this;
        let deleteNote = this.input.state.value;
        if(data.length == 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        if(deleteNote == "" || deleteNote == undefined){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.DeleteNoteCannotEmpty));
            return;
        }
        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));
        
        let requestObject = {
            dataList: data,
            deleteNote: deleteNote,
            success: function(responseBody) {
                self.setState({
                    data: [],
                    loading: false
                }); 
                MessageUtils.showOperationSuccess();
            }
        }
        IncomingDeleteRequest.sendDeleteRequest(requestObject);
    }

    printLable = () => {
        const {data} = this.state;
        if (data && data.length > 0) {
            let requestObject = {
                materialLotUnitList : data,    
                success: function(responseBody) {
                    let url = PrintServiceUrl.WltBox;
                    responseBody.parameterMapList.forEach((parameter) => {
                        PrintUtils.MultiPrintWithBtIbForWeb(url, parameter, 1);
                    });
                }
            }
            GetPrintWltVboxParameterRequest.sendQueryRequest(requestObject);
        }

    }

    createTotalNumber = () => {
        let materialLots = this.state.data;
        let count = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                count = count + data.currentQty;
            });
        }
        return <Tag color="#2db7f5">颗数：{count}</Tag>
    }

    createStatistic = () => {
        return <Tag color="#2db7f5">片数：{this.state.data.length}</Tag>
    }

    createDeleteButton = () => {
        return <Button key="delete" type="primary" style={styles.tableButton} loading={this.state.loading} icon="delete" onClick={this.deleteData}>
                        {I18NUtils.getClientMessage(i18NCode.BtnDelete)}
                    </Button>
    }

    createPrintButton = () => {
        return <Button key="print" type="primary" style={styles.tableButton} loading={this.state.loading} icon="print" onClick={this.printLable}>
                        {I18NUtils.getClientMessage(i18NCode.PrintLable)}
                    </Button>
    }

    buildOperationColumn = () => {
        
    }
    
}

const styles = {
    input: {
        width: 300
    },
    tableButton: {
        marginLeft:'20px'
    }
};