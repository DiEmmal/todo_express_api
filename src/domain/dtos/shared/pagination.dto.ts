export class PaginationDto {
    
    public readonly page: number;
    public readonly limit: number;

    private constructor(page: number, limit: number) {
        this.page = page;
        this.limit = limit;
    };

    public static create(data: any): { dto?: PaginationDto, error?: string } {
        const page = data.page ? Number(data.page) : 1;
        const limit = data.limit ? Number(data.limit) : 10;

        if(isNaN(page) || isNaN(limit)) {
            return { error: 'Page and limit must be numbers' };
        }

        if(page < 1 || limit < 1) {
            return { error: 'Page and limit must be greater than 0' };
        }

        if(limit > 100) {
            return { error: 'Limit must be less than or equal to 100' };
        }

        return { dto: new PaginationDto(page, limit) };
    };
};