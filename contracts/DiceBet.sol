pragma solidity >=0.6.0;

contract rollDice {
    uint256 constant MAX_CASE = 6; //for dice
    uint256 constant MIN_BET = 0.01 ether;
    uint256 constant MAX_BET = 10 ether;
    uint256 constant HOUSE_FEE_PERCENT = 5;
    uint256 constant HOUSE_MIN_FEE = 0.005 ether;

    address payable public owner; //=> account address data type
    uint256 public lockedInBets;

    struct Bet {
        uint256 amount;
        uint256 placeBlockNumber;
        address payable gambler;
        uint256 winningAmount;
        uint256 diceNum;
    }

    mapping(address => Bet) bets;

    event Reveal(address indexed gambler, uint256 reveal, uint256 amount);
    event Payment(address indexed beneficiary, uint256 amount);
    event FailedPayment(address indexed beneficiary, uint256 amount);

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    function withdrawFunds(address payable beneficiary, uint256 withdrawAmount)
        external
        onlyOwner
    {
        require(
            withdrawAmount + lockedInBets <= address(this).balance,
            "larger than balance"
        );
        sendFunds(beneficiary, withdrawAmount);
    }

    function sendFunds(address payable beneficiary, uint256 amount) private {
        if (beneficiary.send(amount)) {
            emit Payment(beneficiary, amount);
        } else {
            emit FailedPayment(beneficiary, amount);
        }
    }

    function kill() external onlyOwner {
        require(
            lockedInBets == 0,
            "All bets should be processed before self-destruct."
        );
        selfdestruct(owner);
    }

    receive() external payable {} //function for receiving contract's initial operating funds.

    function placeBet() external payable {
        uint256 amount = msg.value;

        require(
            amount >= MIN_BET && amount <= MAX_BET,
            "Amount is out of range."
        );

        Bet storage bet = bets[msg.sender]; //mapping bets(address=>bets)

        require(bet.gambler == address(0), "Bet should be empty state.");
        //address(0) = null in address type.

        uint256 possibleWinningAmount = 2 * amount;
        lockedInBets += possibleWinningAmount;

        require(
            lockedInBets < address(this).balance,
            "Cannot afford to pay the bet."
        );

        bet.amount = amount;
        bet.placeBlockNumber = block.number;
        bet.gambler = msg.sender;
    }

    function getWinningAmount(uint256 amount, uint8 seed)
        private
        returns (uint256 winningAmount)
    {
        Bet storage bet = bets[msg.sender];
        uint256 placeBlockNumber = bet.placeBlockNumber;
        uint256 housefee = (amount * HOUSE_FEE_PERCENT) / 100;

        if (housefee < HOUSE_MIN_FEE) {
            housefee = HOUSE_MIN_FEE;
        }

        bytes32 random = keccak256(
            abi.encodePacked(
                blockhash(block.number - seed),
                blockhash(placeBlockNumber)
            )
        );

        uint256 reveal = uint256(random) % MAX_CASE;
        uint256 reward;

        if (reveal == 0) {
            reward = amount / 20;
        }

        if (reveal == 1) {
            reward = amount / 2;
        }

        if (reveal == 2 || reveal == 3) {
            reward = amount;
        }

        if (reveal == 4) {
            reward = (amount * 3) / 2;
        }

        if (reveal == 5) {
            reward = amount * 2;
        }

        winningAmount = reward - housefee;
        bet.winningAmount = winningAmount;
        bet.diceNum = reveal;
    }

    function revealResult() external {
        Bet storage bet = bets[msg.sender];
        uint256 amount = bet.amount;
        uint256 placeBlockNumber = bet.placeBlockNumber;
        address payable gambler = bet.gambler;
        uint256 diceNum = bet.diceNum;

        require(amount > 0, "Bet should be in an 'active' state.");
        require(
            block.number > placeBlockNumber,
            "revealResult in the same block as placeBet, or before"
        );

        uint256 winningAmount = bet.winningAmount;

        emit Reveal(gambler, diceNum + 1, winningAmount);
        if (winningAmount > 0) {
            sendFunds(gambler, winningAmount);
        }
        lockedInBets -= winningAmount;
        clearBet(msg.sender);
    }

    function clearBet(address player) private {
        Bet storage bet = bets[player];

        bet.amount = 0;
        bet.placeBlockNumber = 0;
        bet.winningAmount = 0;
        bet.gambler = address(0);
    }

    function refundBet() external {
        Bet storage bet = bets[msg.sender];
        uint256 amount = bet.amount;
        address payable gambler = bet.gambler;
        require(
            block.number > bet.placeBlockNumber,
            "refundBet in the same block as placeBet, or before."
        );
        require(amount > 0, "Bet should be in an 'active' state.");
        uint256 possibleWinningAmount;
        possibleWinningAmount = bet.winningAmount;

        lockedInBets -= possibleWinningAmount;
        clearBet(msg.sender);
        sendFunds(gambler, amount);
    }

    function checkHouseFund() public view onlyOwner returns (uint256) {
        return address(this).balance;
    }
}