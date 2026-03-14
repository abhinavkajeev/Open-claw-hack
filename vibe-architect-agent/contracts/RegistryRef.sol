// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IERC8004Registry {
    function ownerOf(uint256 tokenId) external view returns (address);
}

contract RegistryRef {
    address public immutable registry;

    constructor(address registryAddress) {
        require(registryAddress != address(0), "registry cannot be zero");
        registry = registryAddress;
    }

    function isOwner(uint256 tokenId, address claimant) external view returns (bool) {
        return IERC8004Registry(registry).ownerOf(tokenId) == claimant;
    }
}
