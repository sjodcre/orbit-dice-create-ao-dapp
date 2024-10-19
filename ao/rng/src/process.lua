local process = require "lib.process_lib"

-- Version
Version       = "0.0.1"

-- Constants
_0RBIT        = "BaMK1dfayo75s3q1ow6AO64UDpD9SEFbeE8xYrY2fyQ"
_0RBT_POINTS  = "BUhZLMwQ6yZHguLtJYA5lLUa9LQzLXMXRfaq9FVcPJc"
FEE_AMOUNT    = "1000000000000" -- 1 $0RBT
BASE_URL      = "http://www.randomnumberapi.com/api/v1.0/random?min=1&max=6&count=1"

 
-- Handler to Get Random Number
Handlers.add("getNumber",
    Handlers.utils.hasMatchingTag("Action", "GetNumber"),
    process.getNumber
)

-- Handler to Receive Random Number
Handlers.add(
    "ReceiveData",
    Handlers.utils.hasMatchingTag("Action", "Receive-Response"),
    process.receiveNumber
)

-- Handler to Read the Random Number
Handlers.add(
    "ReturnData",
    Handlers.utils.hasMatchingTag("Action", "ReadNumber"),
    process.readNumber
)