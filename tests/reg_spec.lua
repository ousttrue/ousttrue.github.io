describe("reg", function()
  it("frontmatter", function()
    local src=[[---
title: "QTableViewとQAbstractTableModel"
date: 2013-01-04
tags: ["python", "qt"]
---

BODY]]
    local f, c = string.match(src, "^%-%-%-\n(.-)\n%-%-%-\n\n?(.*)$")

    assert.same('BODY', c)


  end)
end)
