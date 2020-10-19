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
import { AppUser } from 'models/AppUser';






























import { Role } from 'models/Role'



/* end individual import */

interface AppUserPreviewProps<T extends Model>
    {
    previewModel?: T;
    isOpenPreview?: boolean;
    isLoadingPreview?: boolean;
    handleClosePreview?: () => void;
    handleGoDetail?: (id: number) => () => void;
    translate?: TFunction;
    };

    function AppUserPreview(props: AppUserPreviewProps<AppUser>
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
                                    <span className="preview__header-date">{translate('appUsers.startDate')} { previewModel.startDate ? moment(previewModel.startDate).format('DD/MM/YYYY') : null }</span>
                                </div>
                                <button className="btn gradient-btn-icon ant-tooltip-open" onClick={handleGoDetail(previewModel.id)}>
                                    <i className="tio-edit"></i>
                                </button>
                            </div>
                        </div>
                        <div className="preview__body">
                            <div className="preview__content">
                                <Descriptions title={previewModel.name} column={2}>
                                    
                                    
                                    <Descriptions.Item label={translate('appUsers.username')}>
                                        <span className="gradient-text">{ previewModel.username }</span>
                                    </Descriptions.Item>
                                    
                                    
                                    <Descriptions.Item label={translate('appUsers.password')}>
                                        <span className="gradient-text">{ previewModel.password }</span>
                                    </Descriptions.Item>
                                    
                                    
                                    <Descriptions.Item label={translate('appUsers.otpCode')}>
                                        <span className="gradient-text">{ previewModel.otpCode }</span>
                                    </Descriptions.Item>
                                    
                                    
                                    <Descriptions.Item label={translate('appUsers.otpExpired')}>
                                        <span className="gradient-text">
                                            { previewModel.otpExpired ? moment(previewModel.otpExpired).format('DD/MM/YYYY') : null }
                                        </span>
                                    </Descriptions.Item>
                                    
                                    
                                    <Descriptions.Item label={translate('appUsers.displayName')}>
                                        <span className="gradient-text">{ previewModel.displayName }</span>
                                    </Descriptions.Item>
                                    
                                    
                                    <Descriptions.Item label={translate('appUsers.address')}>
                                        <span className="gradient-text">{ previewModel.address }</span>
                                    </Descriptions.Item>
                                    
                                    
                                    <Descriptions.Item label={translate('appUsers.email')}>
                                        <span className="gradient-text">{ previewModel.email }</span>
                                    </Descriptions.Item>
                                    
                                    
                                    <Descriptions.Item label={translate('appUsers.phone')}>
                                        <span className="gradient-text">{ previewModel.phone }</span>
                                    </Descriptions.Item>
                                    
                                    
                                    
                                    
                                    <Descriptions.Item label={translate('appUsers.department')}>
                                        <span className="gradient-text">{ previewModel.department }</span>
                                    </Descriptions.Item>
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    <Descriptions.Item label={translate('appUsers.avatar')}>
                                        <span className="gradient-text">{ previewModel.avatar }</span>
                                    </Descriptions.Item>
                                    
                                    
                                    <Descriptions.Item label={translate('appUsers.birthday')}>
                                        <span className="gradient-text">
                                            { previewModel.birthday ? moment(previewModel.birthday).format('DD/MM/YYYY') : null }
                                        </span>
                                    </Descriptions.Item>
                                    
                                    
                                    
                                    <Descriptions.Item label={translate('appUsers.used')}>
                                        <span className="gradient-text">{ previewModel.used }</span>
                                    </Descriptions.Item>
                                    
                                    
                                    <Descriptions.Item label={translate('appUsers.longitude')}>
                                        <span className="gradient-text">{ previewModel.longitude }</span>
                                    </Descriptions.Item>
                                    
                                    
                                    <Descriptions.Item label={translate('appUsers.latitude')}>
                                        <span className="gradient-text">{ previewModel.latitude }</span>
                                    </Descriptions.Item>
                                    
                                    
                                    <Descriptions.Item label={translate('appUsers.organization')}>
                                        <span className="gradient-text">{ previewModel?.organization?.name }</span>
                                    </Descriptions.Item>
                                    
                                    <Descriptions.Item label={translate('appUsers.position')}>
                                        <span className="gradient-text">{ previewModel?.position?.name }</span>
                                    </Descriptions.Item>
                                    
                                    <Descriptions.Item label={translate('appUsers.province')}>
                                        <span className="gradient-text">{ previewModel?.province?.name }</span>
                                    </Descriptions.Item>
                                    
                                    <Descriptions.Item label={translate('appUsers.sex')}>
                                        <span className="gradient-text">{ previewModel?.sex?.name }</span>
                                    </Descriptions.Item>
                                    
                                    <Descriptions.Item label={translate('appUsers.status')}>
                                        <span className="gradient-text">{ previewModel?.status?.name }</span>
                                    </Descriptions.Item>
                                    
                                    
                                </Descriptions>
                            </div>
                            <div className="preview__content">
                                <Table tableLayout='fixed'
                                       rowKey={nameof(previewModel.appUserRoleMappingsMappings[0].id)}
                                       columns={[
                                       
                                       
                                       
                                       
                                       {
                                       title: translate('appUserRoleMappingMappings.role'),
                                       dataIndex: 'role' ,
                                       key: 'role' ,
                                       render(role: Role){
                                       return role?.name;
                                       }
                                       },
                                       ]}
                                       pagination={false}
                                       dataSource={previewModel.appUserRoleMappingsMappings} />
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

            export default AppUserPreview;
