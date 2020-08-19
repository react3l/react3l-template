import Card from 'antd/lib/card';
import Typography from 'antd/lib/typography';
import React from 'react';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

function IndirectSalesOrderMasterView() {
  const [translate] = useTranslation();

  return (
    <Card title={(
      <Text>
        {translate('province.master.title')}
      </Text>
    )}>
    </Card>
  );
}

export default IndirectSalesOrderMasterView;
