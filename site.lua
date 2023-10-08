---@param path string
local function add_lua_path(path)
  package.path =
    string.format("%s/?.lua;%s/?/init.lua;%s", path, path, package.path)
end
add_lua_path "libs"
add_lua_path "lua_modules/share/lua/5.1"

local yaml = require "tinyyaml"
local etlua = require "etlua"
local INDEX = etlua.compile [[<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title><%= title %></title>
  </head>
  <body>
    <%- content %>
  </body>
</html>]]

local CONTENT = etlua.compile [[<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title><%= title %></title>
  </head>
  <body>
    <%= date %>
    <pre>
    <%- content %>
    </pre>
  </body>
</html>]]

---@class Path
local Path = require "path"

local ICON_MAP = {
  file = "📄",
  directory = "📁",
}

---@param src string
---@return table frontmatter
---@return string content
local function split_frontmatter(src)
  -- yaml
  local f, c = string.match(src, "^%-%-%-\n(.-)\n%-%-%-\n\n?(.*)$")
  if f then
    return yaml.parse(f), c
    -- local ok, res = pcall(yaml.parse(f), c)
    -- assert(ok, string.format("%s: %s", res, src:sub(1, 32)))
    -- return res
  end
end

---@class Article
---@field path string

---@class Site:SiteInstance
local Site = {}
Site.__index = Site

---@param src_base Path
---@param dst_dir Path
---@param filter fun(string): boolean
---@return Site
function Site.new(src_base, dst_dir, filter)
  ---@class SiteInstance
  local instance = {
    src_base = src_base,
    dst_dir = dst_dir,
    filter = filter,
    ---@type Article[]
    articles = {},
  }
  ---@type Site
  return setmetatable(instance, Site)
end

---@param src Path
function Site:process(src)
  -- print(src, dir)
  local rel = self.src_base:make_relative_path(src)
  if not self.filter(rel.path) then
    return
  end

  local stem, ext = rel:get_stem_ext()
  if ext == "md" then
    local dst = Path.new((self.dst_dir / stem).path .. ".html")

    local dst_rel = self.dst_dir:make_relative_path(dst)

    print(string.format("%s => %s", src, dst))
    local content = src:read()

    -- forntmatter
    local frontmatter, body = split_frontmatter(content)
    assert(frontmatter, string.format("%s\n%s", src, content:sub(1, 32)))
    frontmatter.path = dst_rel.path

    -- TODO: markdown to html

    if content then
      dst:write(CONTENT {
        title = frontmatter.title,
        date = frontmatter.date,
        content = body,
      })
      table.insert(self.articles, frontmatter)
    end
  end
end

function Site:generate()
  -- clear dst
  if self.dst_dir:is_exists() then
    print("clear", self.dst_dir)
    self.dst_dir:rmdir()
  end

  self.src_base:traverse(
    ---@param file Path
    function(file)
      self:process(file)
    end
  )

  table.sort(self.articles, function(a, b)
    return a.path > b.path
  end)

  -- index
  do
    local w = io.open((self.dst_dir / "index.html").path, "w")
    if w then
      local anchors = ""
      for i, article in ipairs(self.articles) do
        local anchor = string.format(
          '<li>%d[%s]<a href="%s">%s</a></li>\n',
          i,
          article.date,
          article.path,
          article.title
        )
        anchors = anchors .. anchor
      end

      w:write(INDEX {
        title = "三次元日誌(手作り[lua])",
        content = anchors,
      })

      w:close()
    end
  end
end

local site = Site.new(
  Path.new "content",
  Path.new "public",
  ---@param rel string
  ---@return boolean
  function(rel)
    return rel:match "posts/"
  end
)

site:generate()
