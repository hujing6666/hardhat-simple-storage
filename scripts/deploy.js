const { ethers, run, network } = require("hardhat")

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Deploy contract...")
  const SimpleStorage = await SimpleStorageFactory.deploy()
  await SimpleStorage.waitForDeployment()
  console.log("SimpleStorage", SimpleStorage)
  console.log(`Deployed contract to: ${SimpleStorage.target}`)
  // console.log(network.config)
  // what happens when we deploy to our hardhat network?
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmations...")
    await SimpleStorage.waitForDeployment(6)
    await verify(SimpleStorage.target, [])
  }

  const currentValue = await SimpleStorage.retrieve()
  console.log(`Current Value is: ${currentValue}`)

  // Update the current value
  const transactionResponse = await SimpleStorage.store(7)
  await transactionResponse.wait(1)
  const updatedValue = await SimpleStorage.retrieve()
  console.log(`Updated Value is: ${updatedValue}`)
}
// console.log(`Deployed contract to: ${SimpleStorage.address}`)
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
async function verify(contractAddress, args) {
  console.log("Verifying contract...")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!")
    } else {
      console.log(e)
    }
  }
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
