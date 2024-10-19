local mod = {}
local json = require("json")

RANDOM_NUMBER = RANDOM_NUMBER or 1;

-- Function to send a GET Request to 0rbit
function mod.getNumber()
    mod.sendReply(
        _0RBT_POINTS,
        "Transfer",
        {
            Action = "Transfer",
            Recipient = _0RBIT,
            Quantity = FEE_AMOUNT,
            ["X-Url"] = BASE_URL,
            ["X-Action"] = "Get-Real-Data"
        },
        ""
    )
end

-- Processes the received random number from 0rbit
function mod.receiveNumber(msg)
    local res = json.decode(msg.Data)
    print(res[1])
    RANDOM_NUMBER = res[1]
    print(RANDOM_NUMBER)
    return RANDOM_NUMBER
end

-- Reads and replies with the current random number
function mod.readNumber(msg)
    print(RANDOM_NUMBER)
    Handlers.utils.reply(tostring(RANDOM_NUMBER))(msg)
end

-- Helper function to send a reply message
function mod.sendReply(target, action, tags, data)
    Send({
        Target = target,
        ["Response-For"] = action,
        Tags = tags,
        Data = data
    })
end

return mod