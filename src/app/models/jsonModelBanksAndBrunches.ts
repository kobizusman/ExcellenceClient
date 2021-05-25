export class JsonModelBanksAndBrunches
{
    status :string
    code :Int32Array
    data :Data
}

export class Data
{
    banks : Array<Bank>
    bankBranches:Array<BankBranch> 
}

export class BankBranch
{
    bankCode :Int32Array;
    branchNumber :Int32Array;
    branchName:string;
}

export class Bank
{
    code :Int32Array;
    description :string;
    status :boolean;
}