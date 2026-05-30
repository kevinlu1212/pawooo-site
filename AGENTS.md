# Pawooo 宠物品牌网站项目

## 项目位置
- 本地文件：`D:\宠物手办\网站文件\`
- GitHub 仓库：https://github.com/kevinlu1212/pawooo-site
- 网站地址：https://kevinlu1212.github.io/pawooo-site/

## GitHub 账号
- 用户名：kevinlu1212
- 邮箱：2858835655@qq.com
- Git 代理：127.0.0.1:7897（已配置）

## 文件结构
- `index.html` — 第一版网站
- `index_2.html` — 第二版网站
- `index_3.html` — 第三版（当前主力版本，支持双向滚动）
- `首.mp4` — 开场视频（约1.6MB）
- `main.mp4` — 主视频（约43MB，已压缩）
- `尾.mp4` — 结尾视频（约2.6MB）

## index_3.html 功能
- 全屏视频 + 文案叠加
- 滚轮/触屏/键盘双向滚动切换视频段
- main.mp4 按每4秒一段播放（共4段）
- 每段旁有商品图片框（左侧或右侧，不遮挡视频）
- 开场（首.mp4）和结尾（尾.mp4）独立播放
- 底部进度条 + 右侧导航点

## 常用命令
```bash
cd "D:\宠物手办\网站文件"
git add .
git commit -m "描述改了什么"
git push origin master
```

## 待办
- 视频文件较大，考虑进一步压缩或使用 Cloudflare Pages
- 商品图片（product1-5.jpg）需准备
