import React from 'react'
import Sidebar from './Sidebar'
import DocSettingsRouter from './DocSettingsRouter'
import { Card, Layout } from 'antd'
import './docSettings.scss'

const DocSettings = () => {
  return (
    <div className="doc-settings">
      <Card className="doc-settings-card">
        <Layout>
          <Sidebar />
          <DocSettingsRouter />
        </Layout>
      </Card>
    </div>
  )
}

export default DocSettings
