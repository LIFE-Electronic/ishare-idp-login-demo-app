const getX5C = (certChain) => {
    const parts = certChain.split("-----END CERTIFICATE-----")
    const partsClear = parts.map(part => part.replace("-----BEGIN CERTIFICATE-----", "")
                                             .replace("-----END CERTIFICATE-----", "")
                                             .replace(/\n/g, ""))
                            .filter(p => p.length > 0)
    console.info(partsClear)
    return partsClear
}

export default getX5C