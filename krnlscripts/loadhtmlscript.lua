function loadhtmlscript(url)
    -- Fetch HTML content
    local success, html = pcall(function()
        return game:HttpGet(url)
    end)

    if not success then
        warn("Failed to fetch URL: " .. tostring(html))
        return
    end

    -- Remove all HTML tags <...>
    local luaCode = html:gsub("<.->", "")

    -- Trim whitespace
    luaCode = luaCode:match("^%s*(.-)%s*$")

    -- Compile Lua
    local func, err = loadstring(luaCode)
    if not func then
        warn("Error compiling Lua: " .. tostring(err))
        return
    end

    -- Run the Lua
    local ok, runtimeErr = pcall(func)
    if not ok then
        warn("Runtime error: " .. tostring(runtimeErr))
    end
end
