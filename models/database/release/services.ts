import { IReleaseDocument, IReleaseModel, ReleaseStatus } from "./IRelease";


export const releaseFindOneById = async function (this: IReleaseModel, id: string): Promise<IReleaseDocument> {
    return await this.findOne({ _id: id });
}

export const releaseFindLatestByStatus = async function <T = keyof Partial<IReleaseDocument>>(
    this: IReleaseModel,
    status: ReleaseStatus | 'APPROVAL_CHECKED_OFF',
    limit=100,
    projection?: T,
    exclusiveStartTime?: Date
): Promise<Partial<IReleaseDocument[]>> {
    const filter:any = {};
    if(status==='APPROVAL_CHECKED_OFF'){
        filter.status ="APPROVED"
        filter.approvalCheckedOff = true;
    }
    else{
        filter.status = status;
        if(status==='APPROVED'){
            filter.approvalCheckedOff = {$in:[undefined,false,null]};
        }
    }
    if(exclusiveStartTime){
        filter.lastActionTime = {$lt:exclusiveStartTime}
    }
    const releases = await this.find(filter,projection).sort({
        lastActionTime: -1,
    })
    .limit(limit)
    return releases;
}