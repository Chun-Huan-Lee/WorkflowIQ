> [!CAUTION]
此專案目前處於早期開發階段。某些功能可能尚未完成或無法正常運作。

# WorkflowIQ
### AI 驅動的商業流程智能平台

<div align="center">

<img src="/docs/img/project-banner3.png" alt="Project Banner" width="100%"  style="object-fit: cover; border-radius: 10px;" />

**透過 AI 和協作的力量，將複雜的商業流程轉化為清晰、優化的工作流程。**

[🚀 快速開始](#-快速開始) · [📖 文檔](#-文檔) · [🎯 演示](#-演示) · [💬 社群](#-社群)

[![Version](https://img.shields.io/github/v/release/Chun-Huan-Lee/workflowiq?style=for-the-badge&logo=github)](https://github.com/Chun-Huan-Lee/workflowiq/releases)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Build Status](https://img.shields.io/github/actions/workflow/status/Chun-Huan-Lee/workflowiq/ci.yml?style=for-the-badge&logo=github-actions)](https://github.com/Chun-Huan-Lee/workflowiq/actions)

</div>

---

## 🚧 專案狀態

> **⚠️ 早期開發階段**
> 
> WorkflowIQ 目前處於**非常早期的開發階段**，許多功能仍在進行中。我們正在積極建構和改進核心功能。雖然基礎架構穩固，但隨著我們持續開發平台，預期會有頻繁的變更和改進。

### 目前開發重點

- 🔨 **核心基礎設施** - 建立強健的後端和前端基礎
- 🤖 **AI 整合** - 實作流程發現和分析功能  
- 🎨 **使用者介面** - 設計直覺的工作流程視覺化工具
- 🔗 **整合功能** - 建立與熱門商業工具的連接器
- 📚 **文檔** - 建立全面的指南和範例

### 如何協助我們

我們**非常歡迎貢獻者**在這個令人興奮的階段加入！無論您是開發者、設計師、產品經理或領域專家，都有許多方式可以參與：

- 🐛 **回報問題** - 幫助我們識別錯誤和改進領域
- 💡 **建議功能** - 分享新功能和增強功能的想法
- 🛠️ **貢獻程式碼** - 提交功能、修復或優化的 pull request
- 📖 **改善文檔** - 幫助使我們的文檔更清晰、更全面
- 🧪 **測試與回饋** - 試用平台並分享您的體驗

> **加入我們建構工作流程智能的未來！** 每一個貢獻，無論多小，都有助於將 WorkflowIQ 塑造成為全球組織的強大工具。閱讀我們的[貢獻指南](CONTRIBUTING.md)了解更多。


## 📋 目錄

- [概述](#-概述)
  - [問題陳述](#問題陳述)
  - [解決方案](#解決方案)
  - [主要功能](#主要功能)
- [架構](#️-架構)
- [技術堆疊](#️-技術堆疊)
- [快速開始](#-快速開始)
  - [先決條件](#先決條件)
  - [安裝](#安裝)
  - [首次執行](#首次執行)
- [專案結構](#-專案結構)
- [配置](#️-配置)
- [測試](#-測試)
- [部署](#-部署)
- [文檔](#-文檔)
- [貢獻](#-貢獻)
- [授權](#-授權)
- [社群](#-社群)

## 🎯 概述

### 問題陳述

現代組織在流程效率不佳、知識孤島和缺乏工作流程可見性方面面臨困難。傳統的流程管理工具無法提供：

- 流程改進的**即時協作**
- 優化機會的 **AI 驅動洞察**  
- 現有工作流程的**自動發現**
- 與現有商業工具的**無縫整合**

### 解決方案

WorkflowIQ 是一個智能工作流程管理平台，使用 AI 自動發現、視覺化和優化商業流程，同時支援團隊在流程改進計畫上的即時協作。

### 主要功能

#### 🤖 **AI 驅動的流程發現**
- 自然語言處理從文檔中提取工作流程
- 機器學習分析電子郵件模式、日曆數據和工具使用情況
- 從系統日誌進行智能流程挖掘
- 自動工作流程文檔生成

#### 🔄 **即時協作設計**
- 多個使用者可以同時編輯流程圖
- 即時游標、評論和註釋
- 無衝突複製數據類型 (CRDTs) 實現無縫協作
- 具有分支/合併功能的版本控制

#### 📊 **互動式流程視覺化**
- 動態、可篩選的流程圖，具有向下鑽取功能
- 疊加在圖表上的即時性能指標
- 顯示瓶頸和優化機會的熱力圖
- 流程執行的互動時間軸視圖

#### ⚡ **多步驟工作流程自動化**
- 具有條件邏輯的視覺工作流程建構器
- 與熱門商業工具整合 (Slack、JIRA、Salesforce)
- 企業系統的自定義 API 連接器
- 人工參與決策點

#### 📈 **智能商業智能**
- AI 生成的流程性能洞察
- 資源規劃的預測分析
- 流程偏差的異常檢測
- 自動報告的自定義 KPI 追蹤

## 🏗️ 架構

```mermaid
graph TB
    subgraph "前端層"
        A[Next.js App] --> B[React Components]
        B --> C[即時協作]
        C --> D[D3.js 視覺化]
    end
    
    subgraph "後端層"
        E[Express API] --> F[身份驗證]
        E --> G[WebSocket 伺服器]
        E --> H[商業邏輯]
    end
    
    subgraph "AI 服務"
        I[流程發現] --> J[NLP 引擎]
        I --> K[ML 模型]
        I --> L[向量搜尋]
    end
    
    subgraph "數據層"
        M[PostgreSQL] --> N[流程數據]
        O[Redis] --> P[會話/快取]
        Q[Pinecone] --> R[向量存儲]
    end
    
    A --> E
    E --> I
    E --> M
    E --> O
    I --> Q
```

## 🛠️ 技術堆疊

<table>
<tr>
<td><strong>前端</strong></td>
<td>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js"/>
  <img alt="React" src="https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react"/>
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript"/>
  <img alt="TailwindCSS" src="https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat-square&logo=tailwind-css"/>
</td>
</tr>
<tr>
<td><strong>後端</strong></td>
<td>
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-18+-green?style=flat-square&logo=node.js"/>
  <img alt="Express" src="https://img.shields.io/badge/Express-4.18-black?style=flat-square&logo=express"/>
  <img alt="Prisma" src="https://img.shields.io/badge/Prisma-5.7-2D3748?style=flat-square&logo=prisma"/>
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-15-336791?style=flat-square&logo=postgresql"/>
</td>
</tr>
<tr>
<td><strong>AI/ML</strong></td>
<td>
  <img alt="OpenAI" src="https://img.shields.io/badge/OpenAI-GPT--4-00A67E?style=flat-square&logo=openai"/>
  <img alt="LangChain" src="https://img.shields.io/badge/LangChain-0.1-1C3C3C?style=flat-square"/>
  <img alt="Python" src="https://img.shields.io/badge/Python-3.11-blue?style=flat-square&logo=python"/>
  <img alt="Pinecone" src="https://img.shields.io/badge/Pinecone-Vector--DB-000?style=flat-square"/>
</td>
</tr>
<tr>
<td><strong>DevOps</strong></td>
<td>
  <img alt="Docker" src="https://img.shields.io/badge/Docker-24.0-blue?style=flat-square&logo=docker"/>
  <img alt="GitHub Actions" src="https://img.shields.io/badge/GitHub_Actions-CI/CD-2088FF?style=flat-square&logo=github-actions"/>
  <img alt="Terraform" src="https://img.shields.io/badge/Terraform-1.6-623CE4?style=flat-square&logo=terraform"/>
</td>
</tr>
</table>

## 🚀 快速開始

### 先決條件

確保您已安裝以下軟體：

- **Node.js** >= 18.0.0 ([下載](https://nodejs.org/))
- **Docker** & Docker Compose ([下載](https://docs.docker.com/get-docker/))
- **Git** ([下載](https://git-scm.com/))

### 安裝

1. **複製儲存庫**
   ```bash
   git clone https://github.com/Chun-Huan-Lee/workflowiq.git
   cd workflowiq
   ```

2. **安裝相依套件**
   ```bash
   npm install
   ```

3. **設定環境變數**
   ```bash
   cp .env.example .env
   cp frontend/.env.local.example frontend/.env.local
   cp backend/.env.example backend/.env
   ```

4. **配置您的環境**
   
   使用您的配置編輯 `.env` 檔案：
   ```bash
   # 必需的 API 金鑰
   OPENAI_API_KEY=your_openai_key_here
   PINECONE_API_KEY=your_pinecone_key_here
   
   # 資料庫配置
   DATABASE_URL=postgresql://user:password@localhost:5432/workflowiq
   REDIS_URL=redis://localhost:6379
   ```

### 首次執行

1. **啟動開發環境**
   ```bash
   # 選項 1: 使用 Docker (推薦)
   npm run docker:dev
   
   # 選項 2: 手動設定
   npm run dev
   ```

2. **初始化資料庫**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

3. **存取應用程式**
   
   | 服務 | URL | 描述 |
   |---------|-----|-------------|
   | 🌐 前端 | http://localhost:3000 | 主要應用程式介面 |
   | 🔧 後端 API | http://localhost:8000 | REST API 端點 |
   | 🤖 AI 服務 | http://localhost:8001 | AI/ML 處理服務 |
   | 📊 資料庫工作室 | http://localhost:5555 | Prisma 資料庫介面 |

## 📁 專案結構

```
workflowiq/
├── 📁 frontend/              # Next.js 前端應用程式
│   ├── 📁 app/              # App Router 頁面和佈局
│   ├── 📁 components/       # 可重用的 React 元件
│   ├── 📁 lib/              # 工具函數和配置
│   └── 📁 types/            # TypeScript 類型定義
├── 📁 backend/              # Node.js 後端 API
│   ├── 📁 src/
│   │   ├── 📁 routes/       # API 路由處理器
│   │   ├── 📁 models/       # 資料庫模型和模式
│   │   ├── 📁 services/     # 商業邏輯服務
│   │   ├── 📁 middleware/   # Express 中介軟體
│   │   └── 📁 utils/        # 工具函數
│   └── 📁 prisma/           # 資料庫模式和遷移
├── 📁 ai-services/          # Python AI/ML 服務
│   ├── 📁 process_discovery/# 流程挖掘演算法
│   ├── 📁 nlp/             # 自然語言處理
│   └── 📁 ml_models/       # 機器學習模型
├── 📁 shared/              # 共享類型和工具
├── 📁 docs/                # 文檔
└── 📁 scripts/             # 開發和部署腳本
```

## ⚙️ 配置

<details>
<summary><strong>🔧 環境變數</strong></summary>

| 變數 | 描述 | 必需 | 預設值 |
|----------|-------------|----------|---------|
| `OPENAI_API_KEY` | AI 功能的 OpenAI API 金鑰 | ✅ | - |
| `PINECONE_API_KEY` | 向量搜尋的 Pinecone API 金鑰 | ✅ | - |
| `DATABASE_URL` | PostgreSQL 連接字串 | ✅ | - |
| `REDIS_URL` | Redis 連接字串 | ✅ | - |
| `JWT_SECRET` | JWT 令牌簽名密鑰 | ✅ | - |
| `NODE_ENV` | 環境模式 | ❌ | `development` |

</details>

<details>
<summary><strong>🐳 Docker 配置</strong></summary>

專案包含不同環境的 Docker 配置：

- `docker-compose.yml` - 開發環境
- `docker-compose.prod.yml` - 生產環境
- `docker-compose.test.yml` - 測試環境

</details>

## 🧪 測試

```bash
# 執行所有測試
npm run test

# 執行覆蓋率測試
npm run test:coverage

# 執行特定測試套件
npm run test:frontend    # 前端測試
npm run test:backend     # 後端測試
npm run test:ai          # AI 服務測試

# 在監控模式下執行測試
npm run test:watch
```

## 🚀 部署

### 生產部署

1. **建構應用程式**
   ```bash
   npm run build
   ```

2. **使用 Docker 部署**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

3. **部署到雲端平台**
   ```bash
   # 將前端部署到 Vercel
   cd frontend && vercel deploy --prod
   
   # 將後端部署到 AWS
   npm run deploy:aws
   ```

詳細的部署說明，請參閱我們的[部署指南](docs/deployment.md)。

## 📖 文檔 (即將推出！)

| 資源 | 描述 |
|----------|-------------|
| [📚 API 文檔](docs/api.md) | 完整的 API 參考 |
| [🏗️ 架構指南](docs/architecture.md) | 系統設計和架構 |
| [🔧 開發設定](docs/development.md) | 詳細的開發指南 |
| [🚀 部署指南](docs/deployment.md) | 生產部署說明 |
| [❓ 常見問題](docs/faq.md) | 常見問題解答 |

## 🤝 貢獻

我們歡迎社群的貢獻！請在開始前閱讀我們的[貢獻指南](CONTRIBUTING.md)。

### 快速貢獻步驟

1. **Fork 儲存庫**
2. **建立功能分支** (`git checkout -b feature/amazing-feature`)
3. **進行更改**並新增測試
4. **提交更改** (`git commit -m 'Add amazing feature'`)
5. **推送到分支** (`git push origin feature/amazing-feature`)
6. **開啟 Pull Request**

### 開發指南

- 遵循我們的[編碼標準](CONTRIBUTING.md#-coding-standards)
- 為新功能撰寫測試
- 需要時更新文檔
- 遵循慣例提交訊息

## 📄 授權

此專案依據 **MIT 授權** 授權 - 詳見 [LICENSE](LICENSE) 檔案。

```
MIT License - Copyright (c) 2025 Chun-Huan Lee
```

## 💬 社群

<div align="center">

[![GitHub Discussions](https://img.shields.io/github/discussions/Chun-Huan-Lee/workflowiq?style=for-the-badge&logo=github)](https://github.com/Chun-Huan-Lee/workflowiq/discussions)
[![Discord](https://img.shields.io/discord/123456789?style=for-the-badge&logo=discord&label=Discord)](https://discord.gg/workflowiq) (即將推出)

</div>

### 取得幫助與支援

- 💬 **[GitHub Discussions](https://github.com/Chun-Huan-Lee/workflowiq/discussions)** - 提問和取得幫助
- 🐛 **[問題追蹤器](https://github.com/Chun-Huan-Lee/workflowiq/issues)** - 回報錯誤或請求功能
- 📧 **電子郵件支援** - [vincent741516899@gmail.com](mailto:vincent741516899@gmail.com)
- 📖 **文檔** - [docs.workflowiq.com](https://docs.workflowiq.com) (即將推出)

### 演示與實例 (即將推出)

- 🎯 **[實時演示](https://demo.workflowiq.com)** - 無需安裝即可試用 WorkflowIQ
- 📊 **[範例工作流程](examples/)** - 預建的工作流程模板
- 🎥 **[影片教學](https://youtube.com/workflowiq)** - 逐步指南

---

<div align="center">

**[⭐ 為此儲存庫加星號](https://github.com/Chun-Huan-Lee/workflowiq/stargazers)** 如果您覺得有幫助！

</div>
