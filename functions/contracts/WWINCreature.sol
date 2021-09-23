// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721Tradable.sol";

/**
 * @title WWIN Creature
 * Creature - a contract for non-fungible creatures.
 */
contract WWINCreature is ERC721Tradable {
    constructor(
        string memory _name,
        string memory _symbol,
        string memory _description,
        uint256 _maxSupply)
        ERC721Tradable(_name, _symbol, _description, _maxSupply)
    {}
}
