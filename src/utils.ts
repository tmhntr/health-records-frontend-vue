import { HealthRecord, UserData } from "./types";

export const API_URL = "http://localhost:5001";

export async function getRecords(
    limit?: number,
    skip?: number,
    sortBy?: string,
    sortDir?: string,
    filter?: string
): Promise<HealthRecord[]> {
    const url =
        API_URL +
        "/records?" +
        new URLSearchParams([
            ["sortBy", sortBy || "id"],
            ["sortDir", sortDir || "asc"],
            ["filter", filter || ""],
            ["skip", skip?.toString() || "0"],
            ["limit", limit?.toString() || "10"],
        ]).toString();
    const res = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (res.status === 200) {
        return res.json();
    } else {
        throw new Error("Failed to get records");
    }
}

export async function getRecord(id: number): Promise<HealthRecord> {
    const res = await fetch(`${API_URL}/records/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (res.status === 200) {
        return res.json();
    } else {
        throw new Error("Failed to get record");
    }
}

export async function createRecord(
    record: HealthRecord
): Promise<HealthRecord> {
    const res = await fetch(`${API_URL}/records`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
    });

    if (res.status === 200) {
        return res.json();
    } else {
        throw new Error("Failed to create record");
    }
}

export async function updateRecord(
    record: HealthRecord
): Promise<HealthRecord> {
    const res = await fetch(`${API_URL}/records/${record.id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
    });

    if (res.status === 200) {
        return res.json();
    } else {
        throw new Error("Failed to update record");
    }
}

export async function deleteRecord(id: number) {
    const res = await fetch(`${API_URL}/records/${id}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (res.status === 200) {
        return res.json();
    } else {
        throw new Error("Failed to delete record");
    }
}

export async function login(
    username: string,
    password: string
): Promise<UserData> {
    const res = await fetch(`${API_URL}/auth`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "username=" + username + "&password=" + password,
    });

    if (res.status === 200) {
        return res.json();
    } else {
        throw new Error("Failed to login");
    }
}

export async function getRecordCount(): Promise<number> {
    const res = await fetch(`${API_URL}/records/count`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (res.status === 200) {
        const { count } = await res.json();
        return count;
    } else {
        throw new Error("Failed to get record count");
    }
}

export async function logout() {
    const res = await fetch(`${API_URL}/logout`, {
        method: "GET",
        credentials: "include",
    });

    if (res.status === 200) {
        return res.json();
    } else {
        throw new Error("Failed to logout");
    }
}

export async function getUser(): Promise<UserData> {
    try {
        const res = await fetch(`${API_URL}/users/me/`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (res.status === 200) {
            return res.json();
        } else {
            throw new Error("Failed to get user");
        }
    } catch (e) {
        throw new Error("Failed to get user");
    }
}
