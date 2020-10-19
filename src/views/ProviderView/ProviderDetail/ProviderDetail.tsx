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
import ContentModal from "components/Utility/ContentModal/ContentModal";
import ContentTable from "components/Utility/ContentTable/ContentTable";
import TreeSelect from "components/Utility/TreeSelect/TreeSelect";
import { Provider } from 'models/Provider';
import { PROVIDER_MASTER_ROUTE } from 'config/route-consts'
import { providerRepository } from "repositories/provider-repository";
/* end individual import */

const { TabPane } = Tabs;

function ProviderDetailView() {
    const [translate] = useTranslation();

    const {
        model,
        handleUpdateNewModel,
        isDetail,
        handleChangeSimpleField,
        handleChangeTreeObjectField,
        handleChangeObjectField,
        handleSave,
    } = detailService.useDetail<Provider>
    (
        Provider,
        providerRepository.get,
        providerRepository.save,
        PROVIDER_MASTER_ROUTE
    );

    return (
        <div className='page page__detail'>
            <div className='page__header d-flex align-items-center'>
                <div className='page__title mr-1'>
                    {translate("providers.detail.title")}
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
                                        <FormItem label={translate("providers.name")}
                                                validateStatus={formService.getValidationStatus<Provider>(model.errors, nameof(model.name))}
                                                message={ model.errors?.name }>
                                            <InputText isMaterial={true}
                                                        value={ model.name }
                                                        placeHolder={translate("providers.placeholder.name")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.name))} />
                                        </FormItem>
                                    </Col>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("providers.googleRedirectUri")}
                                                validateStatus={formService.getValidationStatus<Provider>(model.errors, nameof(model.googleRedirectUri))}
                                                message={ model.errors?.googleRedirectUri }>
                                            <InputText isMaterial={true}
                                                        value={ model.googleRedirectUri }
                                                        placeHolder={translate("providers.placeholder.googleRedirectUri")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.googleRedirectUri))} />
                                        </FormItem>
                                    </Col>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("providers.aDIP")}
                                                validateStatus={formService.getValidationStatus<Provider>(model.errors, nameof(model.aDIP))}
                                                message={ model.errors?.aDIP }>
                                            <InputText isMaterial={true}
                                                        value={ model.aDIP }
                                                        placeHolder={translate("providers.placeholder.aDIP")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.aDIP))} />
                                        </FormItem>
                                    </Col>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("providers.aDUsername")}
                                                validateStatus={formService.getValidationStatus<Provider>(model.errors, nameof(model.aDUsername))}
                                                message={ model.errors?.aDUsername }>
                                            <InputText isMaterial={true}
                                                        value={ model.aDUsername }
                                                        placeHolder={translate("providers.placeholder.aDUsername")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.aDUsername))} />
                                        </FormItem>
                                    </Col>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("providers.aDPassword")}
                                                validateStatus={formService.getValidationStatus<Provider>(model.errors, nameof(model.aDPassword))}
                                                message={ model.errors?.aDPassword }>
                                            <InputText isMaterial={true}
                                                        value={ model.aDPassword }
                                                        placeHolder={translate("providers.placeholder.aDPassword")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.aDPassword))} />
                                        </FormItem>
                                    </Col>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("providers.googleClient")}
                                                validateStatus={formService.getValidationStatus<Provider>(model.errors, nameof(model.googleClient))}
                                                message={ model.errors?.googleClient }>
                                            <InputText isMaterial={true}
                                                        value={ model.googleClient }
                                                        placeHolder={translate("providers.placeholder.googleClient")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.googleClient))} />
                                        </FormItem>
                                    </Col>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("providers.googleClientSecret")}
                                                validateStatus={formService.getValidationStatus<Provider>(model.errors, nameof(model.googleClientSecret))}
                                                message={ model.errors?.googleClientSecret }>
                                            <InputText isMaterial={true}
                                                        value={ model.googleClientSecret }
                                                        placeHolder={translate("providers.placeholder.googleClientSecret")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.googleClientSecret))} />
                                        </FormItem>
                                    </Col>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("providers.microsoftClient")}
                                                validateStatus={formService.getValidationStatus<Provider>(model.errors, nameof(model.microsoftClient))}
                                                message={ model.errors?.microsoftClient }>
                                            <InputText isMaterial={true}
                                                        value={ model.microsoftClient }
                                                        placeHolder={translate("providers.placeholder.microsoftClient")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.microsoftClient))} />
                                        </FormItem>
                                    </Col>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("providers.microsoftClientSecret")}
                                                validateStatus={formService.getValidationStatus<Provider>(model.errors, nameof(model.microsoftClientSecret))}
                                                message={ model.errors?.microsoftClientSecret }>
                                            <InputText isMaterial={true}
                                                        value={ model.microsoftClientSecret }
                                                        placeHolder={translate("providers.placeholder.microsoftClientSecret")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.microsoftClientSecret))} />
                                        </FormItem>
                                    </Col>
                                    

                                    <Col lg={6} className='pr-3'>
                                        <FormItem label={translate("providers.microsoftRedirectUri")}
                                                validateStatus={formService.getValidationStatus<Provider>(model.errors, nameof(model.microsoftRedirectUri))}
                                                message={ model.errors?.microsoftRedirectUri }>
                                            <InputText isMaterial={true}
                                                        value={ model.microsoftRedirectUri }
                                                        placeHolder={translate("providers.placeholder.microsoftRedirectUri")}
                                                        className={"tio-account_square_outlined"}
                                                        onChange={handleChangeSimpleField(nameof(model.microsoftRedirectUri))} />
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
                        {translate("providers.button.saveModel")}
                    </button>
                </Row>
            </div>
        </div>
    );
}

export default ProviderDetailView;
