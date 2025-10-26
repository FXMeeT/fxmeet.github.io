function loadhtmlscript(url)
    -- Fetch HTML content
    local success, html = pcall(function()
        return game:HttpGet(url)
    end)

    if not success then
        warn("Failed to fetch URL: " .. tostring(html))
        return
    end

    -- Remove everything between < and > (HTML tags)
    local luaCode = html:gsub("<!%-%-.-%-%->", "") -- remove HTML comments
    luaCode = luaCode:gsub("<.->", "")              -- remove tags like <head>, <body>, etc.

    -- Replace HTML entities if any (basic cleanup)
    luaCode = luaCode:gsub("&lt;", "<")
                     :gsub("&gt;", ">")
                     :gsub("&amp;", "&")
                     :gsub("&quot;", "\"")
                     :gsub("&apos;", "'")

    -- Remove everything before the first Lua line (if there’s meta junk)
    luaCode = luaCode:match("[^\r\n]*%-%- Services.*") or luaCode

    -- Trim whitespace
    luaCode = luaCode:match("^%s*(.-)%s*$")

    -- Compile
    local func, err = loadstring(luaCode)
    if not func then
        warn("Error compiling Lua: " .. tostring(err))
        return
    end

    -- Run safely
    local ok, runtimeErr = pcall(func)
    if not ok then
        warn("Runtime error: " .. tostring(runtimeErr))
    end
end
