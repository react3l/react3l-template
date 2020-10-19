/* begin general import */
import React from "react";
import { useTranslation } from "react-i18next";
import nameof from "ts-nameof.macro";
import { Card, Col, Row, Switch, Tabs } from "antd";
import FormItem from "components/Utility/FormItem/FormItem";
import { formService } from "services/form-service";
import detailService from "services/pages/detail-service";
/* end general import */

/* begin individual import */
import InputText from "components/Utility/Input/InputText/InputText";
import Select from "components/Utility/Select/Select";
import DatePicker from "components/Utility/Calendar/DatePicker/DatePicker";
import ContentModal from "components/Utility/ContentModal/ContentModal";
import ContentTable from "components/Utility/ContentTable/ContentTable";
import TreeSelect from "components/Utility/TreeSelect/TreeSelect";
import { EventMessage } from 'models/EventMessage';
import { EVENT_MESSAGE_MASTER_ROUTE } from 'config/route-consts'
import { eventMessageRepository } from "repositories/event-message-repository";
/* end individual import */

const { TabPane } = Tabs;

function EventMessageDetailView() {
    const [translate] = useTranslation();

    const {
        model,
        handleUpdateNewModel,
        isDetail,
        handleChangeSimpleField,
        handleChangeTreeObjectField,
        handleChangeObjectField,
        handleSave,
    } = detailService.useDetail<EventMessage>
    (
        EventMessage,
        eventMessageRepository.get,
        eventMessageRepository.save,
        EVENT_MESSAGE_MASTER_ROUTE
    );

    return (
        <div className='page page__detail'>
            <div className='page__header d-flex align-items-center'>
                <div className='page__title mr-1'>
                    {translate("eventMessages.detail.title")}
                </div>
                {isDetail ? (
                <div className='page__id'>{`- # ${model.id}`}</div>
                ) : (
                translate("general.actions.create")
                )}
            </div>
            <div className='w-100 mt-3 page__detail-tabs'>
                <Row className='d-flex'>
                    <Col lg={18}>
                    <Card className='mr-3'>
                        <Tabs defaultActiveKey='1'>
                            <TabPane tab={translate("general.detail.generalInfomation")}
                                     key='1'>
                                <Row>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("eventMessages.time")}
                                                validateStatus={formService.getValidationStatus<EventMessage>(model.errors, nameof(model.time))}
                                                message={ model.errors?.time }>
                                            <DatePicker isMaterial={true}
                                                        value={ model.time }
                                                        placeholder={translate("eventMessages.placeholder.time")}
                                                        onChange={handleChangeSimpleField(nameof(model.time))} />
                                        </FormItem>
                                    </Col>
                                    


                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("eventMessages.entityName")}
                                                validateStatus={formService.getValidationStatus<EventMessage>(model.errors, nameof(model.entityName))}
                                                message={ model.errors?.entityName }>
                                            <InputText isMaterial={true}
                                                        value={ model.entityName }
                                                        placeHolder={translate("eventMessages.placeholder.entityName")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.entityName))} />
                                        </FormItem>
                                    </Col>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("eventMessages.content")}
                                                validateStatus={formService.getValidationStatus<EventMessage>(model.errors, nameof(model.content))}
                                                message={ model.errors?.content }>
                                            <InputText isMaterial={true}
                                                        value={ model.content }
                                                        placeHolder={translate("eventMessages.placeholder.content")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.content))} />
                                        </FormItem>
                                    </Col>
                                    
                                </Row>
                            </TabPane>
                        </Tabs>
                    </Card>
                    </Col>
                </Row>
            </div>
            <div className='w-100 mt-3 page__detail-tabs'>
                <Row className='mt-3 mb-5'>
                    <button className='btn component__btn-primary pr-4 mb-5'
                            onClick={handleSave()}>
                        {translate("eventMessages.button.saveModel")}
                    </button>
                </Row>
            </div>
        </div>
    );
}

export default EventMessageDetailView;
