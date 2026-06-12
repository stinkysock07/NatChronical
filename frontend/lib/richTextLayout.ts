type RichTextChild = {
    text?: string;
    children?: RichTextChild[];
};

type RichTextBlock = {
    type: string;
    children: RichTextChild[];
};

type RichTextSegment<TBlock> = {
    blocks: TBlock[];
    image: string | null;
};

function getBlockWeight(block: RichTextBlock): number {
    if (!Array.isArray(block?.children) || block.children.length === 0) {
        return 1;
    }

    const textContent = block.children
        .flatMap((child) => {
            if (typeof child?.text === 'string') {
                return [child.text];
            }

            if (Array.isArray(child?.children)) {
                return child.children
                    .map((nested) => (typeof nested?.text === 'string' ? nested.text : ''))
                    .filter(Boolean);
            }

            return [];
        })
        .join(' ')
        .trim();

    const textWeight = textContent ? Math.ceil(textContent.length / 80) : 1;

    if (block.type === 'heading') {
        return Math.max(1, Math.floor(textWeight * 0.6));
    }

    if (block.type === 'list') {
        return Math.max(2, textWeight);
    }

    return textWeight;
}

export function prepareRichTextBlocks<TBlock extends RichTextBlock>(
    blocks: TBlock[] = [],
): TBlock[] {
    return blocks;
}

export function splitBlocksWithImages<TBlock extends RichTextBlock>(
    blocks: TBlock[] = [],
    images: string[] = [],
): RichTextSegment<TBlock>[] {
    if (!images.length) {
        return [{ blocks, image: null }];
    }

    const imageSlots = images.length;
    const segments: RichTextSegment<TBlock>[] = [];

    const blockWeights = blocks.map((block) => getBlockWeight(block));
    let blockIndex = 0;
    let remainingWeight = blockWeights.reduce((sum, weight) => sum + weight, 0);

    for (let imageIndex = 0; imageIndex < imageSlots; imageIndex += 1) {
        const remainingSegments = imageSlots - imageIndex + 1;
        const targetWeight =
            remainingSegments > 0 ? remainingWeight / remainingSegments : remainingWeight;

        const startIndex = blockIndex;
        let consumedWeight = 0;

        while (blockIndex < blocks.length) {
            const blocksLeft = blocks.length - blockIndex;
            const segmentsLeftAfterCurrent = imageSlots - imageIndex;

            if (blocksLeft <= segmentsLeftAfterCurrent) {
                break;
            }

            consumedWeight += blockWeights[blockIndex];
            blockIndex += 1;

            if (consumedWeight >= targetWeight && blockIndex > startIndex) {
                break;
            }
        }

        segments.push({
            blocks: blocks.slice(startIndex, blockIndex),
            image: images[imageIndex],
        });

        remainingWeight -= consumedWeight;
    }

    segments.push({
        blocks: blocks.slice(blockIndex),
        image: null,
    });

    return segments;
}