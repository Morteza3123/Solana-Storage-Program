import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { StorageApp } from "../target/types/storage_app";
const { SystemProgram } = anchor.web3;
const assert = require("assert");

//deployed program id = BnDUouxaJCFAeKjdHY53NCCXQBw64yHeTcfuM3Y2d6Dn

describe("storage-app", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.StorageApp as Program<StorageApp>;

  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  it("Is initialized!", async () => {
    // Add your test here.
    // const tx = await program.methods.initialize().rpc();
    // console.log("Your transaction signature", tx);
    /* Call the create function via RPC */
    // const baseAccount = anchor.web3.Keypair.generate();
    // await program.rpc.create({
    //   accounts: {
    //     baseAccount: baseAccount.publicKey,
    //     user: provider.wallet.publicKey,
    //     systemProgram: SystemProgram.programId,
    //   },
    //   signers: [baseAccount],
    // });

     /* Fetch the account and check the value of count */
     const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    //  const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
     console.log('Count 0: ', account.count.toString())
     assert.ok(account.count.toString() == "0");
    //  _baseAccount = baseAccount;

    // await program.methods.increment().accounts({
    //   baseAccount: baseAccount.publicKey
    // }).rpc();

    const account0 = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('Count 1: ', account0.count.toString())
  });
});
