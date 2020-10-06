import React from 'react';
import { Model } from '@react3l/react3l/core/model';
import { Descriptions } from 'antd';
import ChatBox from 'components/Utility/ChatBox/ChatBox';
import Modal from 'components/Utility/Modal/Modal';
import { TFunction } from 'i18next';
import Table from "antd/lib/table";
import moment from "moment";
import nameof from "ts-nameof.macro";
import { useGlobal } from 'reactn';
import { User } from 'models/User';
import {disscusionRepository} from 'repositories/disscusion-repository';
import { userRepository } from 'repositories/user-repository';
import { PriceList } from 'models/PriceList';

interface PriceListPreviewProps<T extends Model> {
    previewModel?: T;
    isOpenPreview?: boolean;
    isLoadingPreview?: boolean;
    handleClosePreview?: () => void;
    handleGoDetail?: (id: number) => () => void;
    translate?: TFunction;
};

function PriceListPreview(props: PriceListPreviewProps<PriceList>) {
    const {
        previewModel,
        isOpenPreview,
        isLoadingPreview,
        handleClosePreview,
        handleGoDetail,
        translate,
    } = props;

    const [userInfo] = useGlobal<User>('user');

    return <>
        <Modal title={null}
            visible={isOpenPreview}
            handleCancel={handleClosePreview}
            width={1000}
            visibleFooter={false}
            >
            { isLoadingPreview ? 
                <div className="loading-block">
                    <img src="/assets/svg/spinner.svg"  alt='Loading...'/>
                </div> :
                <div className="preview__containter">
                    <div className="preview__left-side">
                        <div className="preview__header">
                            <div className="preview__vertical-bar"></div>
                            <div className="preview__header-info">
                                <div className="preview__header-text">
                                <span className="preview__header-title">{previewModel.name}</span>
                                <span className="preview__header-date">Ngày tạo { previewModel.startDate ? moment(previewModel.startDate).format('DD/MM/YYYY') : null }</span>
                                </div>
                                <button className="btn gradient-btn-icon ant-tooltip-open" onClick={handleGoDetail(previewModel.id)}>
                                    <i className="tio-edit"></i>
                                </button>
                            </div>
                        </div>
                        <div className="preview__body">
                            <div className="preview__content">
                                <Descriptions title={previewModel.name} column={2}>
                                    <Descriptions.Item label={translate('priceList.name')}>
                                        <span className="gradient-text">{ previewModel.name }</span>
                                    </Descriptions.Item>
                                    <Descriptions.Item label={translate('priceList.code')}>
                                        <span className="gradient-text">{ previewModel.code }</span>
                                    </Descriptions.Item>
                                    <Descriptions.Item label={translate('priceList.startDate')}>
                                        <span className="gradient-text">
                                        { previewModel.startDate ? moment(previewModel.startDate).format('DD/MM/YYYY') : null }
                                        </span>
                                    </Descriptions.Item>
                                    <Descriptions.Item label={translate('priceList.endDate')}>
                                        <span className="gradient-text">
                                        { previewModel.endDate ? moment(previewModel.endDate).format('DD/MM/YYYY') : null }
                                        </span>
                                    </Descriptions.Item>
                                </Descriptions>
                            </div>
                            <div className="preview__content">
                                <Table tableLayout='fixed'
                                    rowKey={nameof(previewModel.priceListStoreMappings[0].id)}
                                    columns={[
                                        { title: translate('priceListStoreMappings.storeName'), dataIndex: 'storeName', key: 'storeName'},
                                        { title: translate('priceListStoreMappings.storeCode'), dataIndex: 'storeCode', key: 'storeCode'},
                                    ]}
                                    pagination={false}
                                    dataSource={previewModel.priceListStoreMappings}
                                />
                            </div>
                            <div className="preview__content">
                                <img src="/assets/img/img.png" alt="no-data" />
                                <span className="gradient-text transform-text">Have a nice day!</span>
                            </div>
                        </div>
                        <div className="preview__footer"></div>
                    </div>
                    <div className="preview__right-side">
                        <ChatBox getMessages={disscusionRepository.list}
                            countMessages={disscusionRepository.count}
                            postMessage={disscusionRepository.create}
                            deleteMessage={disscusionRepository.delete}
                            attachFile = {disscusionRepository.import}
                            suggestList = {userRepository.list}
                            discussionId={previewModel.rowId}
                            userInfo={userInfo}/>
                    </div>
                </div>
            }
        </Modal>
    </>;
}

export default PriceListPreview;