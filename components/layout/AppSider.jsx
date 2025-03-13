import {Layout, Card, Statistic, List, Typography, Spin}from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useEffect } from "react";
import { fetchAssets } from "../../src/api";
import { useState } from "react";
import { fetchCurrency } from "../../src/api";

const siderStyle = {
    padding: '1rem',
  };

  const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];

//   function percentDifference() {

//   }

export default function AppSider() {
    const [loading, setLoading] = useState(false);
    const [currency, setCurrensy] = useState([]);
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        async function preload() {
            setLoading(true)
            const {result} = await fetchCurrency()
            const assets = await fetchAssets()


            setAssets(assets.map(asset => {
                // const coin = result.find(c => c.id === asset.id)
                // return {
                //     grow: asset.price < coin.price,
                //     //growPercent: percentDifference(asset.price, coin.price),

                //     ...asset
                // }
            }))
            setCurrensy(result)
            setLoading(false)
        }
        preload()
    }, [])

    if (loading) {
        return <Spin fullscreen />
    }

    return (<Layout.Sider width="25%" style={siderStyle}>
     <Card style={{marginBottom: '1rem'}}>
        <Statistic
            title="Active"
            value={11.28}
            precision={2}
            valueStyle={{
              color: '#3f8600',
            }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
        />

        <List
            dataSource={data}
            size="small"
            renderItem={(item) => (
                <List.Item>
                <Typography.Text mark>[ITEM]</Typography.Text> {item}
                </List.Item>
            )}
            />
     </Card>
     <Card variant="borderless">
        <Statistic
          title="Idle"
          value={9.3}
          precision={2}
          valueStyle={{
            color: '#cf1322',
          }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        />
      </Card>

      

  </Layout.Sider>)
}