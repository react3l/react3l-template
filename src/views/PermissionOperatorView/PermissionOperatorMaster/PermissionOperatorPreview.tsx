/* begin general import */
import React from 'react';
import { Model } from '@react3l/react3l/core/model';
import { Descriptions } from 'antd';
import Modal from 'components/Utility/Modal/Modal';
import { TFunction } from 'i18next';
import Table from "antd/lib/table";
import moment from "moment";
import nameof from "ts-nameof.macro";
// import { useGlobal } from 'reactn';
// import ChatBox from 'components/Utility/ChatBox/ChatBox';
// import { AppUser } from 'models/AppUser';
// import {disscusionRepository} from 'repositories/disscusion-repository';
// import { appUserRepository } from 'repositories/app-user-repository';
/* end general import */

/* begin individual import */
import { PermissionOperator } from 'models/PermissionOperator';


/* end individual import */

interface PermissionOperatorPreviewProps<T extends Model>
    {
    previewModel?: T;
    isOpenPreview?: boolean;
    isLoadingPreview?: boolean;
    handleClosePreview?: () => void;
    handleGoDetail?: (id: number) => () => void;
    translate?: TFunction;
    };

    function PermissionOperatorPreview(props: PermissionOperatorPreviewProps<PermissionOperator>
        ) {

        const {
        previewModel,
        isOpenPreview,
        isLoadingPreview,
        handleClosePreview,
        handleGoDetail,
        translate,
        } = props;

        // const [userInfo] = useGlobal<AppUser>('user');

            return <>
            <Modal title={null}
                   visible={isOpenPreview}
                   handleCancel={handleClosePreview}
                   width={1000}
                   visibleFooter={false}>
                { isLoadingPreview ?
                <div className="loading-block">
                    <img src="/assets/svg/spinner.svg" alt='Loading...' />
                </div> :
                <div className="preview__containter">
                    <div className="preview__left-side">
                        <div className="preview__header">
                            <div className="preview__vertical-bar"></div>
                            <div className="preview__header-info">
                                <div className="preview__header-text">
                                    <span className="preview__header-title">{previewModel.name}</span>
                                    <span className="preview__header-date">{translate('permissionOperators.startDate')} { previewModel.startDate ? moment(previewModel.startDate).format('DD/MM/YYYY') : null }</span>
                                </div>
                                <button className="btn gradient-btn-icon ant-tooltip-open" onClick={handleGoDetail(previewModel.id)}>
                                    <i className="tio-edit"></i>
                                </button>
                            </div>
                        </div>
                        <div className="preview__body">
                            <div className="preview__content">
                                <Descriptions title={previewModel.name} column={2}>
                                    
                                    
                                    <Descriptions.Item label={translate('permissionOperators.code')}>
                                        <span className="gradient-text">{ previewModel.code }</span>
                                    </Descriptions.Item>
                                    
                                    
                                    <Descriptions.Item label={translate('permissionOperators.name')}>
                                        <span className="gradient-text">{ previewModel.name }</span>
                                    </Descriptions.Item>
                                    
                                    
                                    
                                    <Descriptions.Item label={translate('permissionOperators.fieldType')}>
                                        <span className="gradient-text">{ previewModel?.fieldType?.name }</span>
                                    </Descriptions.Item>
                                    
                                </Descriptions>
                            </div>
                            <div className="preview__content">
                                <img src="/assets/img/img.png" alt="no-data" />
                                <span className="gradient-text transform-text">Have a nice day!</span>
                            </div>
                        </div>
                        <div className="preview__footer"></div>
                    </div>
                    <div className="preview__right-side">
                        {/* chatBox area, enable if it's necessary */}
                        {/* <ChatBox getMessages={disscusionRepository.list}
                                     countMessages={disscusionRepository.count}
                                     postMessage={disscusionRepository.create}
                                     deleteMessage={disscusionRepository.delete}
                                     attachFile={disscusionRepository.import}
                                     suggestList={appUserRepository.list}
                                     discussionId={previewModel.rowId}
                                     userInfo={userInfo} /> */}
                    </div>
                </div>
                }
            </Modal>
            </>;
            }

            export default PermissionOperatorPreview;
