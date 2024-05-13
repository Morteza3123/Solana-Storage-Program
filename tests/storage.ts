import {Connection, clusterApiUrl, Keypair, LAMPORTS_PER_SOL, TransactionSignature, Transaction, Struct, TransactionInstruction, SystemProgram, sendAndConfirmTransaction, PublicKey} from "@solana/web3.js"
import { AnchorProvider, Program, Wallet, setProvider } from "@project-serum/anchor";
import { StorageApp } from "../target/types/storage_app";
import { publicKey } from "@coral-xyz/anchor/dist/cjs/utils";
const idl = require("./idl.json");
// import idl from "./idl.json";
require("dotenv").config();

export function arrToHex(secretKeyArray:Iterable<number>) {
    const uint8Array = new Uint8Array(secretKeyArray);
    const hexString = Buffer.from(uint8Array).toString('hex');
    return hexString;
}

describe("token-contract", () => {
 // Airdrop SOL for paying transactions
 it("Mint a token", async () => {

//devent program id = BnDUouxaJCFAeKjdHY53NCCXQBw64yHeTcfuM3Y2d6Dn
// account = 8b6MMoRf5yeaejwqqF2ys7XuM45enYzJZGUz1oZRZNNG
const tokenMintPublicKey = new PublicKey("GwF7jSnneid21QYydzzCWhvVGz1faJsyLYQMvSx48Cnr")
const helloWorldprogramId = new PublicKey(idl.metadata.address);
const helloWorldprogramInterface = JSON.parse(JSON.stringify(idl));

const secretKeyString = process.env.SECRET_KEY
const secretKeyString2 = process.env.SECRET_KEY2


const secretKey = Buffer.from(secretKeyString, 'hex');
const secretKey2 = Buffer.from(secretKeyString2, 'hex');
const payer = Keypair.fromSecretKey(secretKey);
const payer2 = Keypair.fromSecretKey(secretKey2);

const wallet = new Wallet(payer);
let keypair = Keypair.generate();

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
  });

const program = new Program(
helloWorldprogramInterface,
helloWorldprogramId,
provider
) as Program<StorageApp>;



//init data
console.log("init data")
const baseAccount = Keypair.generate();
console.log("baseAccount", baseAccount.publicKey)
const txn = await program.rpc.create({
  accounts: {
    baseAccount: baseAccount.publicKey,
    user: provider.wallet.publicKey,
    systemProgram:SystemProgram.programId,
  },
  signers: [baseAccount],
});
console.log("done", txn)


//writing data
console.log("writing data...")
await program.methods.increment().accounts({
  baseAccount: new PublicKey("8b6MMoRf5yeaejwqqF2ys7XuM45enYzJZGUz1oZRZNNG")
}).rpc();
console.log("done")


//reading data
console.log("reading data")
const data = await program.account.baseAccount.fetch(
  new PublicKey("8b6MMoRf5yeaejwqqF2ys7XuM45enYzJZGUz1oZRZNNG")
)
console.log("data", data)

 })
})
