export async function fetcher(
    input: RequestInfo,
    init?: RequestInit
  ): Promise<any> {
    const res = await fetch(input, init);
    return res;
}

export async function jsonFetcher(
    input: RequestInfo,
    init?: RequestInit
  ): Promise<any> {
    const res = await fetch(input, init);
    return res.json();
}

export async function jsonWithCredentialFetcher(
    input: RequestInfo,
    init?: RequestInit
  ): Promise<any> {
    const res = await fetch(input, {
        ...init,
        credentials: 'include',
    });
    return res.json();
}