// Corridor Funding Security Utility
export function sanitizeInput(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

export function validateFileSize(file, maxMb = 1) {
    return file.size <= maxMb * 1024 * 1024;
}