# Структура проекта
После того, как мы разобрались с фундаментом нашего проекта, начнем делать первые шаги. Проверяем, установлены ли `node.js` и `npm`.
<spoiler title="Команды в консоли">
![](https://habrastorage.org/webt/gr/vw/jq/grvwjqqbyh2ntjayjcmo33p4uvm.png)
</spoiler>
Если они не установлены, следуйте инструкциям [здесь](https://nodejs.org/en/).

Создаем папку для нашего проекта. Внутри инициализируем npm `npm init --yes`
Ключ `--yes` означает автоматические ответы вопрос по проекту.

Создадим три папки:
- `build` - оптимизированные файлы для использования на сервере
- `src` - рабочая папка, где будут храниться все наши исходники
- `gulp` - здесь будут храниться наши tasks

Еще добавим файл `.gitignore`, чтобы системные файлы не попадали в репозиторий.
Папка `/build` задокументирована, потому что часто использую `GitHub Pages` для демонстрации работы.

Не забудьте установить gulp: <code>npm install --save-dev gulp</code>

<spoiler title=".gitignore">

```gitignore
# Файлы и папки операционной системы
.DS_Store
Thumbs.db

# Файлы редактора
.idea
*.sublime*
.vscode

# Вспомогательные файлы
*.log*
node_modules/

# Папка с собранными файлами проекта
# build/
```
</spoiler>
