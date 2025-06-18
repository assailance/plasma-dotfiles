const padding = { left: 15, top: 58, right: 15, bottom: 25 };
const savedGeometries = new Map();

function onShortcut() {
    const client = workspace.activeWindow;
    if (!client || client.specialWindow) return;

    if (savedGeometries.has(client.internalId)) {
        const original = savedGeometries.get(client.internalId);
        client.frameGeometry = original;
        savedGeometries.delete(client.internalId);
    } else {
        savedGeometries.set(client.internalId, {
            x: client.frameGeometry.x,
            y: client.frameGeometry.y,
            width: client.frameGeometry.width,
            height: client.frameGeometry.height
        });
        const area = workspace.clientArea(KWin.ScreenArea, client);
        client.frameGeometry = {
            x: area.x + padding.left,
            y: area.y + padding.top,
            width: area.width - padding.left - padding.right,
            height: area.height - padding.top - padding.bottom
        };
    }
}

registerShortcut("Padded Tiling", "Padded Tiling: Expand active window with padding", "Meta+O", onShortcut)
