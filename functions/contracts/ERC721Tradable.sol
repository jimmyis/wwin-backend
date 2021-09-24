// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "openzeppelin-solidity/contracts/utils/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/utils/Strings.sol";

import "./common/meta-transactions/ContentMixin.sol";
import "./common/meta-transactions/NativeMetaTransaction.sol";

/**
 * @title ERC721Tradable
 * ERC721Tradable - ERC721 contract that whitelists a trading address, and has minting functionality.
 */
abstract contract ERC721Tradable is ContextMixin, ERC721Enumerable, NativeMetaTransaction, Ownable {
    using SafeMath for uint256;

    uint256 private _currentTokenId = 0;
    string public baseTokenURI;
    uint256 public maxSupply;
    string public description;
    string public baseQrURL;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _description,
        uint256 _maxSupply
    ) ERC721(_name, _symbol) {
        maxSupply = _maxSupply;
        description = _description;
        _initializeEIP712(_name);
    }

    /**
     * @dev Mints a token to an address with a tokenURI.
     * @param _to address of the future owner of the token
     */
    function mintTo(address _to) public onlyOwner {
        require(_currentTokenId < maxSupply, "Can not mint more than max supply");
        uint256 newTokenId = _getNextTokenId();
        _mint(_to, newTokenId);
        _incrementTokenId();
    }

    /**
     * @dev calculates the next token ID based on value of _currentTokenId
     * @return uint256 for the next token ID
     */
    function _getNextTokenId() private view returns (uint256) {
        return _currentTokenId.add(1);
    }

    /**
     * @dev increments the value of _currentTokenId
     */
    function _incrementTokenId() private {
        _currentTokenId++;
    }

    /**
     * This is used instead of msg.sender as transactions won't be sent by the original token owner, but by OpenSea.
     */
    function _msgSender()
        internal
        override
        view
        returns (address sender)
    {
        return ContextMixin.msgSender();
    }

    function setBaseTokenURI(string memory _uri) public onlyOwner {
        baseTokenURI = _uri;
    }

    function setBaseQrURL(string memory _url) public onlyOwner {
        baseQrURL = _url;
    }

    function tokenURI(uint256 _tokenId) public view virtual override returns (string memory) {
        return string(abi.encodePacked(baseTokenURI, Strings.toString(_tokenId)));
    }

    function qrURL(uint256 _tokenId) public view virtual returns (string memory) {
        return string(abi.encodePacked(
            baseQrURL,
            Strings.toString((_tokenId % 10000 - _tokenId % 1000) / 1000),
            Strings.toString((_tokenId % 1000 - _tokenId % 100) / 100),
            Strings.toString((_tokenId % 100 - _tokenId % 10) / 10),
            Strings.toString(_tokenId % 10)
            ));
    }
}
