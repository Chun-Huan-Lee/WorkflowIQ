<div align="center">

### 🌍 Choose Your Language / 選擇語言 / 选择语言

[![English](https://img.shields.io/badge/English-blue?style=for-the-badge)](README.md)
[![繁體中文](https://img.shields.io/badge/繁體中文-red?style=for-the-badge)](README-zh-TW.md)
[![简体中文](https://img.shields.io/badge/简体中文-red?style=for-the-badge)](README-zh-CN.md)


</div>

---

> [!CAUTION]
此项目目前处于早期开发阶段。某些功能可能尚未完成或无法正常运作。

### AI 驱动的商业流程智能平台

<div align="center">

<img src="/docs/img/project-banner3.png" alt="Project Banner" width="100%"  style="object-fit: cover; border-radius: 10px;" />

**通过 AI 和协作的力量，将复杂的商业流程转化为清晰、优化的工作流程。**

[🚀 快速开始](#-快速开始) · [📖 文档](#-文档) · [🎯 演示](#-演示) · [💬 社区](#-社区)

[![Version](https://img.shields.io/github/v/release/Chun-Huan-Lee/workflowiq?style=for-the-badge&logo=github)](https://github.com/Chun-Huan-Lee/workflowiq/releases)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Build Status](https://img.shields.io/github/actions/workflow/status/Chun-Huan-Lee/workflowiq/ci.yml?style=for-the-badge&logo=github-actions)](https://github.com/Chun-Huan-Lee/workflowiq/actions)

</div>

---

## 🚧 项目状态

> **⚠️ 早期开发阶段**
> 
> WorkflowIQ 目前处于**非常早期的开发阶段**，许多功能仍在进行中。我们正在积极构建和改进核心功能。虽然基础架构稳固，但随着我们持续开发平台，预期会有频繁的变更和改进。

### 当前开发重点

- 🔨 **核心基础设施** - 建立强健的后端和前端基础
- 🤖 **AI 集成** - 实现流程发现和分析功能  
- 🎨 **用户界面** - 设计直观的工作流程可视化工具
- 🔗 **集成功能** - 构建与热门商业工具的连接器
- 📚 **文档** - 创建全面的指南和示例

### 如何帮助我们

我们**非常欢迎贡献者**在这个令人兴奋的阶段加入！无论您是开发者、设计师、产品经理或领域专家，都有许多方式可以参与：

- 🐛 **报告问题** - 帮助我们识别错误和改进领域
- 💡 **建议功能** - 分享新功能和增强功能的想法
- 🛠️ **贡献代码** - 提交功能、修复或优化的 pull request
- 📖 **改善文档** - 帮助使我们的文档更清晰、更全面
- 🧪 **测试与反馈** - 试用平台并分享您的体验

> **加入我们构建工作流程智能的未来！** 每一个贡献，无论多小，都有助于将 WorkflowIQ 塑造成为全球组织的强大工具。阅读我们的[贡献指南](CONTRIBUTING.md)了解更多。


## 📋 目录

- [概述](#-概述)
  - [问题陈述](#问题陈述)
  - [解决方案](#解决方案)
  - [主要功能](#主要功能)
- [架构](#️-架构)
- [技术栈](#️-技术栈)
- [快速开始](#-快速开始)
  - [先决条件](#先决条件)
  - [安装](#安装)
  - [首次运行](#首次运行)
- [项目结构](#-项目结构)
- [配置](#️-配置)
- [测试](#-测试)
- [部署](#-部署)
- [文档](#-文档)
- [贡献](#-贡献)
- [许可](#-许可)
- [社区](#-社区)

## 🎯 概述

### 问题陈述

现代组织在流程效率低下、知识孤岛和缺乏工作流程可见性方面面临困难。传统的流程管理工具无法提供：

- 流程改进的**实时协作**
- 优化机会的 **AI 驱动洞察**  
- 现有工作流程的**自动发现**
- 与现有商业工具的**无缝集成**

### 解决方案

WorkflowIQ 是一个智能工作流程管理平台，使用 AI 自动发现、可视化和优化商业流程，同时支持团队在流程改进计划上的实时协作。

### 主要功能

#### 🤖 **AI 驱动的流程发现**
- 自然语言处理从文档中提取工作流程
- 机器学习分析电子邮件模式、日历数据和工具使用情况
- 从系统日志进行智能流程挖掘
- 自动工作流程文档生成

#### 🔄 **实时协作设计**
- 多个用户可以同时编辑流程图
- 实时光标、评论和注释
- 无冲突复制数据类型 (CRDTs) 实现无缝协作
- 具有分支/合并功能的版本控制

#### 📊 **交互式流程可视化**
- 动态、可筛选的流程图，具有向下钻取功能
- 叠加在图表上的实时性能指标
- 显示瓶颈和优化机会的热力图
- 流程执行的交互时间轴视图

#### ⚡ **多步骤工作流程自动化**
- 具有条件逻辑的可视工作流程构建器
- 与热门商业工具集成 (Slack、JIRA、Salesforce)
- 企业系统的自定义 API 连接器
- 人工参与决策点

#### 📈 **智能商业智能**
- AI 生成的流程性能洞察
- 资源规划的预测分析
- 流程偏差的异常检测
- 自动报告的自定义 KPI 跟踪

## 🏗️ 架构

```mermaid
graph TB
    subgraph "前端层"
        A[Next.js App] --> B[React Components]
        B --> C[实时协作]
        C --> D[D3.js 可视化]
    end
    
    subgraph "后端层"
        E[Express API] --> F[身份验证]
        E --> G[WebSocket 服务器]
        E --> H[业务逻辑]
    end
    
    subgraph "AI 服务"
        I[流程发现] --> J[NLP 引擎]
        I --> K[ML 模型]
        I --> L[向量搜索]
    end
    
    subgraph "数据层"
        M[PostgreSQL] --> N[流程数据]
        O[Redis] --> P[会话/缓存]
        Q[Pinecone] --> R[向量存储]
    end
    
    A --> E
    E --> I
    E --> M
    E --> O
    I --> Q
```

## 🛠️ 技术栈

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
<td><strong>后端</strong></td>
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

## 🚀 快速开始

### 先决条件

确保您已安装以下软件：

- **Node.js** >= 18.0.0 ([下载](https://nodejs.org/))
- **Docker** & Docker Compose ([下载](https://docs.docker.com/get-docker/))
- **Git** ([下载](https://git-scm.com/))

### 安装

1. **克隆仓库**
   ```bash
   git clone https://github.com/Chun-Huan-Lee/workflowiq.git
   cd workflowiq
   ```

2. **安装依赖包**
   ```bash
   npm install
   ```

3. **设置环境变量**
   ```bash
   cp .env.example .env
   cp frontend/.env.local.example frontend/.env.local
   cp backend/.env.example backend/.env
   ```

4. **配置您的环境**
   
   使用您的配置编辑 `.env` 文件：
   ```bash
   # 必需的 API 密钥
   OPENAI_API_KEY=your_openai_key_here
   PINECONE_API_KEY=your_pinecone_key_here
   
   # 数据库配置
   DATABASE_URL=postgresql://user:password@localhost:5432/workflowiq
   REDIS_URL=redis://localhost:6379
   ```

### 首次运行

1. **启动开发环境**
   ```bash
   # 选项 1: 使用 Docker (推荐)
   npm run docker:dev
   
   # 选项 2: 手动设置
   npm run dev
   ```

2. **初始化数据库**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

3. **访问应用程序**
   
   | 服务 | URL | 描述 |
   |---------|-----|-------------|
   | 🌐 前端 | http://localhost:3000 | 主要应用程序界面 |
   | 🔧 后端 API | http://localhost:8000 | REST API 端点 |
   | 🤖 AI 服务 | http://localhost:8001 | AI/ML 处理服务 |
   | 📊 数据库工作室 | http://localhost:5555 | Prisma 数据库界面 |

## 📁 项目结构

```
workflowiq/
├── 📁 frontend/              # Next.js 前端应用程序
│   ├── 📁 app/              # App Router 页面和布局
│   ├── 📁 components/       # 可重用的 React 组件
│   ├── 📁 lib/              # 工具函数和配置
│   └── 📁 types/            # TypeScript 类型定义
├── 📁 backend/              # Node.js 后端 API
│   ├── 📁 src/
│   │   ├── 📁 routes/       # API 路由处理器
│   │   ├── 📁 models/       # 数据库模型和模式
│   │   ├── 📁 services/     # 业务逻辑服务
│   │   ├── 📁 middleware/   # Express 中间件
│   │   └── 📁 utils/        # 工具函数
│   └── 📁 prisma/           # 数据库模式和迁移
├── 📁 ai-services/          # Python AI/ML 服务
│   ├── 📁 process_discovery/# 流程挖掘算法
│   ├── 📁 nlp/             # 自然语言处理
│   └── 📁 ml_models/       # 机器学习模型
├── 📁 shared/              # 共享类型和工具
├── 📁 docs/                # 文档
└── 📁 scripts/             # 开发和部署脚本
```

## ⚙️ 配置

<details>
<summary><strong>🔧 环境变量</strong></summary>

| 变量 | 描述 | 必需 | 默认值 |
|----------|-------------|----------|---------|
| `OPENAI_API_KEY` | AI 功能的 OpenAI API 密钥 | ✅ | - |
| `PINECONE_API_KEY` | 向量搜索的 Pinecone API 密钥 | ✅ | - |
| `DATABASE_URL` | PostgreSQL 连接字符串 | ✅ | - |
| `REDIS_URL` | Redis 连接字符串 | ✅ | - |
| `JWT_SECRET` | JWT 令牌签名密钥 | ✅ | - |
| `NODE_ENV` | 环境模式 | ❌ | `development` |

</details>

<details>
<summary><strong>🐳 Docker 配置</strong></summary>

项目包含不同环境的 Docker 配置：

- `docker-compose.yml` - 开发环境
- `docker-compose.prod.yml` - 生产环境
- `docker-compose.test.yml` - 测试环境

</details>

## 🧪 测试

```bash
# 运行所有测试
npm run test

# 运行覆盖率测试
npm run test:coverage

# 运行特定测试套件
npm run test:frontend    # 前端测试
npm run test:backend     # 后端测试
npm run test:ai          # AI 服务测试

# 在监控模式下运行测试
npm run test:watch
```

## 🚀 部署

### 生产部署

1. **构建应用程序**
   ```bash
   npm run build
   ```

2. **使用 Docker 部署**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

3. **部署到云平台**
   ```bash
   # 将前端部署到 Vercel
   cd frontend && vercel deploy --prod
   
   # 将后端部署到 AWS
   npm run deploy:aws
   ```

详细的部署说明，请参阅我们的[部署指南](docs/deployment.md)。

## 📖 文档 (即将推出！)

| 资源 | 描述 |
|----------|-------------|
| [📚 API 文档](docs/api.md) | 完整的 API 参考 |
| [🏗️ 架构指南](docs/architecture.md) | 系统设计和架构 |
| [🔧 开发设置](docs/development.md) | 详细的开发指南 |
| [🚀 部署指南](docs/deployment.md) | 生产部署说明 |
| [❓ 常见问题](docs/faq.md) | 常见问题解答 |

## 🤝 贡献

我们欢迎社区的贡献！请在开始前阅读我们的[贡献指南](CONTRIBUTING.md)。

### 快速贡献步骤

1. **Fork 仓库**
2. **创建功能分支** (`git checkout -b feature/amazing-feature`)
3. **进行更改**并添加测试
4. **提交更改** (`git commit -m 'Add amazing feature'`)
5. **推送到分支** (`git push origin feature/amazing-feature`)
6. **开启 Pull Request**

### 开发指南

- 遵循我们的[编码标准](CONTRIBUTING.md#-coding-standards)
- 为新功能编写测试
- 需要时更新文档
- 遵循常规提交消息

## 📄 许可

此项目依据 **MIT 许可** 授权 - 详见 [LICENSE](LICENSE) 文件。

```
MIT License - Copyright (c) 2025 Chun-Huan Lee
```

## 💬 社区

<div align="center">

[![GitHub Discussions](https://img.shields.io/github/discussions/Chun-Huan-Lee/workflowiq?style=for-the-badge&logo=github)](https://github.com/Chun-Huan-Lee/workflowiq/discussions)
[![Discord](https://img.shields.io/discord/123456789?style=for-the-badge&logo=discord&label=Discord)](https://discord.gg/workflowiq) (即将推出)

</div>

### 获取帮助与支持

- 💬 **[GitHub Discussions](https://github.com/Chun-Huan-Lee/workflowiq/discussions)** - 提问和获取帮助
- 🐛 **[问题跟踪器](https://github.com/Chun-Huan-Lee/workflowiq/issues)** - 报告错误或请求功能
- 📧 **电子邮件支持** - [vincent741516899@gmail.com](mailto:vincent741516899@gmail.com)
- 📖 **文档** - [docs.workflowiq.com](https://docs.workflowiq.com) (即将推出)

### 演示与实例 (即将推出)

- 🎯 **[实时演示](https://demo.workflowiq.com)** - 无需安装即可试用 WorkflowIQ
- 📊 **[示例工作流程](examples/)** - 预构建的工作流程模板
- 🎥 **[视频教程](https://youtube.com/workflowiq)** - 逐步指南

---

<div align="center">

**[⭐ 为此仓库加星标](https://github.com/Chun-Huan-Lee/workflowiq/stargazers)** 如果您觉得有帮助！

</div>
