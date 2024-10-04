var _a;
import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "stream";
import { renderToPipeableStream } from "react-dom/server";
import { RemixServer, useLoaderData as useLoaderData$1, useRouteError, useActionData, Form } from "@remix-run/react";
import { createReadableStreamFromReadable, json, redirect } from "@remix-run/node";
import { isbot } from "isbot";
import "@shopify/shopify-app-remix/adapters/node";
import { shopifyApp, ApiVersion, AppDistribution, boundary, LoginErrorType } from "@shopify/shopify-app-remix/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import { restResources } from "@shopify/shopify-api/rest/admin/2024-07";
import { PrismaClient } from "@prisma/client";
import "@shopify/shopify-app-remix/react";
import { Page, Layout, Card, BlockStack, Text, Link, List, Box, AppProvider, FormLayout, TextField, Button } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState } from "react";
const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
}
const shopify = shopifyApp({
    apiKey: process.env.SHOPIFY_API_KEY,
    apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
    apiVersion: ApiVersion.July24,
    scopes: (_a = process.env.SCOPES) == null ? void 0 : _a.split(","),
    appUrl: process.env.SHOPIFY_APP_URL || "",
    authPathPrefix: "/auth",
    sessionStorage: new PrismaSessionStorage(prisma),
    distribution: AppDistribution.AppStore,
    restResources,
    future: {
        unstable_newEmbeddedAuthStrategy: true
    },
    ...process.env.SHOP_CUSTOM_DOMAIN ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] } : {}
});
ApiVersion.July24;
const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
const authenticate = shopify.authenticate;
shopify.unauthenticated;
const login = shopify.login;
shopify.registerWebhooks;
shopify.sessionStorage;
const ABORT_DELAY = 5e3;
async function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
    addDocumentResponseHeaders(request, responseHeaders);
    const userAgent = request.headers.get("user-agent");
    // const callbackName = isbot(userAgent ? ? "") ? "onAllReady" : "onShellReady";
    const callbackName = isbot(userAgent ? "onAllReady" : "onShellReady");

    return new Promise((resolve, reject) => {
        const { pipe, abort } = renderToPipeableStream(
            /* @__PURE__ */
            jsx(
                RemixServer, {
                    context: remixContext,
                    url: request.url,
                    abortDelay: ABORT_DELAY
                }
            ), {
                [callbackName]: () => {
                    const body = new PassThrough();
                    const stream = createReadableStreamFromReadable(body);
                    responseHeaders.set("Content-Type", "text/html");
                    resolve(
                        new Response(stream, {
                            headers: responseHeaders,
                            status: responseStatusCode
                        })
                    );
                    pipe(body);
                },
                onShellError(error) {
                    reject(error);
                },
                onError(error) {
                    responseStatusCode = 500;
                    console.error(error);
                }
            }
        );
        setTimeout(abort, ABORT_DELAY);
    });
}
const entryServer = /* @__PURE__ */ Object.freeze( /* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const polarisStyles = "/assets/styles-DT9i95_b.css";
const links$2 = () => [{ rel: "stylesheet", href: polarisStyles }];
const loader$6 = async() => {
    try {
        // const response = await fetch("https://belgiumdia.com/api/DeveloperAPI?APIKEY=134981956a7be967bf4a198e5bfccf4059085cf9dd4d");
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        console.log(data); // Log the data structure to the console

        // Proceed only if data is in the expected format
        if (Array.isArray(data)) {
            await prisma.product.deleteMany();
            await prisma.rating.deleteMany();
            for (const product of data) {
                const rating = await prisma.rating.upsert({
                    where: { productId: product.id },
                    update: {
                        rate: product.rating.rate,
                        count: product.rating.count,
                    },
                    create: {
                        rate: product.rating.rate,
                        count: product.rating.count,
                        productId: product.id,
                    },
                });

                await prisma.product.create({
                    data: {
                        title: product.title,
                        price: product.price,
                        description: product.description,
                        category: product.category,
                        image: product.image,
                        rating: {
                            connect: { id: rating.id },
                        },
                    },
                });
            }

            return { message: "Data successfully inserted into the database." };
        } else {
            console.error("Unexpected data format:", data);
            return { error: "Products data is not in the expected format." };
        }
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return { products: [] };
    }
};

function Products$3() {
    const { products } = useLoaderData$1();
    if (!Array.isArray(products)) {
        return /* @__PURE__ */ jsx("div", { children: "Error: Products data is not in the expected format." });
    }
    return /* @__PURE__ */ jsxs("div", {
        children: [
            /* @__PURE__ */
            jsx("h1", { children: "Products from serevr index 3 ravi" }),
            /* @__PURE__ */
            jsx("ul", { children: products.map((product, index2) => /* @__PURE__ */ jsx("li", { children: product.name }, index2)) })
        ]
    });
}

function ErrorBoundary$1() {
    return boundary.error(useRouteError());
}
const headers$1 = (headersArgs) => {
    return boundary.headers(headersArgs);
};
const route0 = /* @__PURE__ */ Object.freeze( /* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    ErrorBoundary: ErrorBoundary$1,
    default: Products$3,
    headers: headers$1,
    links: links$2,
    loader: loader$6
}, Symbol.toStringTag, { value: "Module" }));

function AdditionalPage() {
    return /* @__PURE__ */ jsxs(Page, {
        children: [
            /* @__PURE__ */
            jsx(TitleBar, { title: "Additional page" }),
            /* @__PURE__ */
            jsxs(Layout, {
                children: [
                    /* @__PURE__ */
                    jsx(Layout.Section, {
                        children: /* @__PURE__ */ jsx(Card, {
                            children: /* @__PURE__ */ jsxs(BlockStack, {
                                gap: "300",
                                children: [
                                    /* @__PURE__ */
                                    jsxs(Text, {
                                        as: "p",
                                        variant: "bodyMd",
                                        children: [
                                            "The app template comes with an additional page which demonstrates how to create multiple pages within app navigation using",
                                            " ",
                                            /* @__PURE__ */
                                            jsx(
                                                Link, {
                                                    url: "https://shopify.dev/docs/apps/tools/app-bridge",
                                                    target: "_blank",
                                                    removeUnderline: true,
                                                    children: "App Bridge"
                                                }
                                            ),
                                            "."
                                        ]
                                    }),
                                    /* @__PURE__ */
                                    jsxs(Text, {
                                        as: "p",
                                        variant: "bodyMd",
                                        children: [
                                            "To create your own page and have it show up in the app navigation, add a page inside ",
                                            /* @__PURE__ */
                                            jsx(Code, { children: "app/routes" }),
                                            ", and a link to it in the ",
                                            /* @__PURE__ */
                                            jsx(Code, { children: "<NavMenu>" }),
                                            " component found in ",
                                            /* @__PURE__ */
                                            jsx(Code, { children: "app/routes/app.jsx" }),
                                            "."
                                        ]
                                    })
                                ]
                            })
                        })
                    }),
                    /* @__PURE__ */
                    jsx(Layout.Section, {
                        variant: "oneThird",
                        children: /* @__PURE__ */ jsx(Card, {
                            children: /* @__PURE__ */ jsxs(BlockStack, {
                                gap: "200",
                                children: [
                                    /* @__PURE__ */
                                    jsx(Text, { as: "h2", variant: "headingMd", children: "Resources" }),
                                    /* @__PURE__ */
                                    jsx(List, {
                                        children: /* @__PURE__ */ jsx(List.Item, {
                                            children: /* @__PURE__ */ jsx(
                                                Link, {
                                                    url: "https://shopify.dev/docs/apps/design-guidelines/navigation#app-nav",
                                                    target: "_blank",
                                                    removeUnderline: true,
                                                    children: "App nav best practices"
                                                }
                                            )
                                        })
                                    })
                                ]
                            })
                        })
                    })
                ]
            })
        ]
    });
}

function Code({ children }) {
    return /* @__PURE__ */ jsx(
        Box, {
            as: "span",
            padding: "025",
            paddingInlineStart: "100",
            paddingInlineEnd: "100",
            background: "bg-surface-active",
            borderWidth: "025",
            borderColor: "border",
            borderRadius: "100",
            children: /* @__PURE__ */ jsx("code", { children })
        }
    );
}
const route1 = /* @__PURE__ */ Object.freeze( /* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: AdditionalPage
}, Symbol.toStringTag, { value: "Module" }));
const loader$5 = async() => {
    // const response = await fetch("https://belgiumdia.com/api/DeveloperAPI?APIKEY=134981956a7be967bf4a198e5bfccf4059085cf9dd4d");
    const response = await fetch("https://fakestoreapi.com/products?limit=5");
    const products = await response.json();
    return { products };
};

function Products$2() {
    const { products } = useLoaderData();
    return /* @__PURE__ */ jsxs("div", {
        children: [
            /* @__PURE__ */
            jsx("h1", { children: "Products from server index-2" }),
            /* @__PURE__ */
            jsx("ul", { children: products.map((product, index2) => /* @__PURE__ */ jsx("li", { children: product.name }, index2)) })
        ]
    });
}
const route2 = /* @__PURE__ */ Object.freeze( /* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: Products$2,
    loader: loader$5
}, Symbol.toStringTag, { value: "Module" }));
const Polaris = {
    ActionMenu: {
        Actions: {
            moreActions: "More actions"
        },
        RollupActions: {
            rollupButton: "View actions"
        }
    },
    ActionList: {
        SearchField: {
            clearButtonLabel: "Clear",
            search: "Search",
            placeholder: "Search actions"
        }
    },
    Avatar: {
        label: "Avatar",
        labelWithInitials: "Avatar with initials {initials}"
    },
    Autocomplete: {
        spinnerAccessibilityLabel: "Loading",
        ellipsis: "{content}…"
    },
    Badge: {
        PROGRESS_LABELS: {
            incomplete: "Incomplete",
            partiallyComplete: "Partially complete",
            complete: "Complete"
        },
        TONE_LABELS: {
            info: "Info",
            success: "Success",
            warning: "Warning",
            critical: "Critical",
            attention: "Attention",
            "new": "New",
            readOnly: "Read-only",
            enabled: "Enabled"
        },
        progressAndTone: "{toneLabel} {progressLabel}"
    },
    Banner: {
        dismissButton: "Dismiss notification"
    },
    Button: {
        spinnerAccessibilityLabel: "Loading"
    },
    Common: {
        checkbox: "checkbox",
        undo: "Undo",
        cancel: "Cancel",
        clear: "Clear",
        close: "Close",
        submit: "Submit",
        more: "More"
    },
    ContextualSaveBar: {
        save: "Save",
        discard: "Discard"
    },
    DataTable: {
        sortAccessibilityLabel: "sort {direction} by",
        navAccessibilityLabel: "Scroll table {direction} one column",
        totalsRowHeading: "Totals",
        totalRowHeading: "Total"
    },
    DatePicker: {
        previousMonth: "Show previous month, {previousMonthName} {showPreviousYear}",
        nextMonth: "Show next month, {nextMonth} {nextYear}",
        today: "Today ",
        start: "Start of range",
        end: "End of range",
        months: {
            january: "January",
            february: "February",
            march: "March",
            april: "April",
            may: "May",
            june: "June",
            july: "July",
            august: "August",
            september: "September",
            october: "October",
            november: "November",
            december: "December"
        },
        days: {
            monday: "Monday",
            tuesday: "Tuesday",
            wednesday: "Wednesday",
            thursday: "Thursday",
            friday: "Friday",
            saturday: "Saturday",
            sunday: "Sunday"
        },
        daysAbbreviated: {
            monday: "Mo",
            tuesday: "Tu",
            wednesday: "We",
            thursday: "Th",
            friday: "Fr",
            saturday: "Sa",
            sunday: "Su"
        }
    },
    DiscardConfirmationModal: {
        title: "Discard all unsaved changes",
        message: "If you discard changes, you’ll delete any edits you made since you last saved.",
        primaryAction: "Discard changes",
        secondaryAction: "Continue editing"
    },
    DropZone: {
        single: {
            overlayTextFile: "Drop file to upload",
            overlayTextImage: "Drop image to upload",
            overlayTextVideo: "Drop video to upload",
            actionTitleFile: "Add file",
            actionTitleImage: "Add image",
            actionTitleVideo: "Add video",
            actionHintFile: "or drop file to upload",
            actionHintImage: "or drop image to upload",
            actionHintVideo: "or drop video to upload",
            labelFile: "Upload file",
            labelImage: "Upload image",
            labelVideo: "Upload video"
        },
        allowMultiple: {
            overlayTextFile: "Drop files to upload",
            overlayTextImage: "Drop images to upload",
            overlayTextVideo: "Drop videos to upload",
            actionTitleFile: "Add files",
            actionTitleImage: "Add images",
            actionTitleVideo: "Add videos",
            actionHintFile: "or drop files to upload",
            actionHintImage: "or drop images to upload",
            actionHintVideo: "or drop videos to upload",
            labelFile: "Upload files",
            labelImage: "Upload images",
            labelVideo: "Upload videos"
        },
        errorOverlayTextFile: "File type is not valid",
        errorOverlayTextImage: "Image type is not valid",
        errorOverlayTextVideo: "Video type is not valid"
    },
    EmptySearchResult: {
        altText: "Empty search results"
    },
    Frame: {
        skipToContent: "Skip to content",
        navigationLabel: "Navigation",
        Navigation: {
            closeMobileNavigationLabel: "Close navigation"
        }
    },
    FullscreenBar: {
        back: "Back",
        accessibilityLabel: "Exit fullscreen mode"
    },
    Filters: {
        moreFilters: "More filters",
        moreFiltersWithCount: "More filters ({count})",
        filter: "Filter {resourceName}",
        noFiltersApplied: "No filters applied",
        cancel: "Cancel",
        done: "Done",
        clearAllFilters: "Clear all filters",
        clear: "Clear",
        clearLabel: "Clear {filterName}",
        addFilter: "Add filter",
        clearFilters: "Clear all",
        searchInView: "in:{viewName}"
    },
    FilterPill: {
        clear: "Clear",
        unsavedChanges: "Unsaved changes - {label}"
    },
    IndexFilters: {
        searchFilterTooltip: "Search and filter",
        searchFilterTooltipWithShortcut: "Search and filter (F)",
        searchFilterAccessibilityLabel: "Search and filter results",
        sort: "Sort your results",
        addView: "Add a new view",
        newView: "Custom search",
        SortButton: {
            ariaLabel: "Sort the results",
            tooltip: "Sort",
            title: "Sort by",
            sorting: {
                asc: "Ascending",
                desc: "Descending",
                az: "A-Z",
                za: "Z-A"
            }
        },
        EditColumnsButton: {
            tooltip: "Edit columns",
            accessibilityLabel: "Customize table column order and visibility"
        },
        UpdateButtons: {
            cancel: "Cancel",
            update: "Update",
            save: "Save",
            saveAs: "Save as",
            modal: {
                title: "Save view as",
                label: "Name",
                sameName: "A view with this name already exists. Please choose a different name.",
                save: "Save",
                cancel: "Cancel"
            }
        }
    },
    IndexProvider: {
        defaultItemSingular: "Item",
        defaultItemPlural: "Items",
        allItemsSelected: "All {itemsLength}+ {resourceNamePlural} are selected",
        selected: "{selectedItemsCount} selected",
        a11yCheckboxDeselectAllSingle: "Deselect {resourceNameSingular}",
        a11yCheckboxSelectAllSingle: "Select {resourceNameSingular}",
        a11yCheckboxDeselectAllMultiple: "Deselect all {itemsLength} {resourceNamePlural}",
        a11yCheckboxSelectAllMultiple: "Select all {itemsLength} {resourceNamePlural}"
    },
    IndexTable: {
        emptySearchTitle: "No {resourceNamePlural} found",
        emptySearchDescription: "Try changing the filters or search term",
        onboardingBadgeText: "New",
        resourceLoadingAccessibilityLabel: "Loading {resourceNamePlural}…",
        selectAllLabel: "Select all {resourceNamePlural}",
        selected: "{selectedItemsCount} selected",
        undo: "Undo",
        selectAllItems: "Select all {itemsLength}+ {resourceNamePlural}",
        selectItem: "Select {resourceName}",
        selectButtonText: "Select",
        sortAccessibilityLabel: "sort {direction} by"
    },
    Loading: {
        label: "Page loading bar"
    },
    Modal: {
        iFrameTitle: "body markup",
        modalWarning: "These required properties are missing from Modal: {missingProps}"
    },
    Page: {
        Header: {
            rollupActionsLabel: "View actions for {title}",
            pageReadyAccessibilityLabel: "{title}. This page is ready"
        }
    },
    Pagination: {
        previous: "Previous",
        next: "Next",
        pagination: "Pagination"
    },
    ProgressBar: {
        negativeWarningMessage: "Values passed to the progress prop shouldn’t be negative. Resetting {progress} to 0.",
        exceedWarningMessage: "Values passed to the progress prop shouldn’t exceed 100. Setting {progress} to 100."
    },
    ResourceList: {
        sortingLabel: "Sort by",
        defaultItemSingular: "item",
        defaultItemPlural: "items",
        showing: "Showing {itemsCount} {resource}",
        showingTotalCount: "Showing {itemsCount} of {totalItemsCount} {resource}",
        loading: "Loading {resource}",
        selected: "{selectedItemsCount} selected",
        allItemsSelected: "All {itemsLength}+ {resourceNamePlural} in your store are selected",
        allFilteredItemsSelected: "All {itemsLength}+ {resourceNamePlural} in this filter are selected",
        selectAllItems: "Select all {itemsLength}+ {resourceNamePlural} in your store",
        selectAllFilteredItems: "Select all {itemsLength}+ {resourceNamePlural} in this filter",
        emptySearchResultTitle: "No {resourceNamePlural} found",
        emptySearchResultDescription: "Try changing the filters or search term",
        selectButtonText: "Select",
        a11yCheckboxDeselectAllSingle: "Deselect {resourceNameSingular}",
        a11yCheckboxSelectAllSingle: "Select {resourceNameSingular}",
        a11yCheckboxDeselectAllMultiple: "Deselect all {itemsLength} {resourceNamePlural}",
        a11yCheckboxSelectAllMultiple: "Select all {itemsLength} {resourceNamePlural}",
        Item: {
            actionsDropdownLabel: "Actions for {accessibilityLabel}",
            actionsDropdown: "Actions dropdown",
            viewItem: "View details for {itemName}"
        },
        BulkActions: {
            actionsActivatorLabel: "Actions",
            moreActionsActivatorLabel: "More actions"
        }
    },
    SkeletonPage: {
        loadingLabel: "Page loading"
    },
    Tabs: {
        newViewAccessibilityLabel: "Create new view",
        newViewTooltip: "Create view",
        toggleTabsLabel: "More views",
        Tab: {
            rename: "Rename view",
            duplicate: "Duplicate view",
            edit: "Edit view",
            editColumns: "Edit columns",
            "delete": "Delete view",
            copy: "Copy of {name}",
            deleteModal: {
                title: "Delete view?",
                description: "This can’t be undone. {viewName} view will no longer be available in your admin.",
                cancel: "Cancel",
                "delete": "Delete view"
            }
        },
        RenameModal: {
            title: "Rename view",
            label: "Name",
            cancel: "Cancel",
            create: "Save",
            errors: {
                sameName: "A view with this name already exists. Please choose a different name."
            }
        },
        DuplicateModal: {
            title: "Duplicate view",
            label: "Name",
            cancel: "Cancel",
            create: "Create view",
            errors: {
                sameName: "A view with this name already exists. Please choose a different name."
            }
        },
        CreateViewModal: {
            title: "Create new view",
            label: "Name",
            cancel: "Cancel",
            create: "Create view",
            errors: {
                sameName: "A view with this name already exists. Please choose a different name."
            }
        }
    },
    Tag: {
        ariaLabel: "Remove {children}"
    },
    TextField: {
        characterCount: "{count} characters",
        characterCountWithMaxLength: "{count} of {limit} characters used"
    },
    TooltipOverlay: {
        accessibilityLabel: "Tooltip: {label}"
    },
    TopBar: {
        toggleMenuLabel: "Toggle menu",
        SearchField: {
            clearButtonLabel: "Clear",
            search: "Search"
        }
    },
    MediaCard: {
        dismissButton: "Dismiss",
        popoverButton: "Actions"
    },
    VideoThumbnail: {
        playButtonA11yLabel: {
            "default": "Play video",
            defaultWithDuration: "Play video of length {duration}",
            duration: {
                hours: {
                    other: {
                        only: "{hourCount} hours",
                        andMinutes: "{hourCount} hours and {minuteCount} minutes",
                        andMinute: "{hourCount} hours and {minuteCount} minute",
                        minutesAndSeconds: "{hourCount} hours, {minuteCount} minutes, and {secondCount} seconds",
                        minutesAndSecond: "{hourCount} hours, {minuteCount} minutes, and {secondCount} second",
                        minuteAndSeconds: "{hourCount} hours, {minuteCount} minute, and {secondCount} seconds",
                        minuteAndSecond: "{hourCount} hours, {minuteCount} minute, and {secondCount} second",
                        andSeconds: "{hourCount} hours and {secondCount} seconds",
                        andSecond: "{hourCount} hours and {secondCount} second"
                    },
                    one: {
                        only: "{hourCount} hour",
                        andMinutes: "{hourCount} hour and {minuteCount} minutes",
                        andMinute: "{hourCount} hour and {minuteCount} minute",
                        minutesAndSeconds: "{hourCount} hour, {minuteCount} minutes, and {secondCount} seconds",
                        minutesAndSecond: "{hourCount} hour, {minuteCount} minutes, and {secondCount} second",
                        minuteAndSeconds: "{hourCount} hour, {minuteCount} minute, and {secondCount} seconds",
                        minuteAndSecond: "{hourCount} hour, {minuteCount} minute, and {secondCount} second",
                        andSeconds: "{hourCount} hour and {secondCount} seconds",
                        andSecond: "{hourCount} hour and {secondCount} second"
                    }
                },
                minutes: {
                    other: {
                        only: "{minuteCount} minutes",
                        andSeconds: "{minuteCount} minutes and {secondCount} seconds",
                        andSecond: "{minuteCount} minutes and {secondCount} second"
                    },
                    one: {
                        only: "{minuteCount} minute",
                        andSeconds: "{minuteCount} minute and {secondCount} seconds",
                        andSecond: "{minuteCount} minute and {secondCount} second"
                    }
                },
                seconds: {
                    other: "{secondCount} seconds",
                    one: "{secondCount} second"
                }
            }
        }
    }
};
const polarisTranslations = {
    Polaris
};

function loginErrorMessage(loginErrors) {
    if ((loginErrors == null ? void 0 : loginErrors.shop) === LoginErrorType.MissingShop) {
        return { shop: "Please enter your shop domain to log in" };
    } else if ((loginErrors == null ? void 0 : loginErrors.shop) === LoginErrorType.InvalidShop) {
        return { shop: "Please enter a valid shop domain to log in" };
    }
    return {};
}
const links$1 = () => [{ rel: "stylesheet", href: polarisStyles }];
const loader$4 = async({ request }) => {
    const errors = loginErrorMessage(await login(request));
    return json({ errors, polarisTranslations });
};
const action$1 = async({ request }) => {
    const errors = loginErrorMessage(await login(request));
    return json({
        errors
    });
};

function Auth() {
    const loaderData = useLoaderData$1();
    const actionData = useActionData();
    const [shop, setShop] = useState("");
    const { errors } = actionData || loaderData;
    return /* @__PURE__ */ jsx(AppProvider, {
        i18n: loaderData.polarisTranslations,
        children: /* @__PURE__ */ jsx(Page, {
            children: /* @__PURE__ */ jsx(Card, {
                children: /* @__PURE__ */ jsx(Form, {
                    method: "post",
                    children: /* @__PURE__ */ jsxs(FormLayout, {
                        children: [
                            /* @__PURE__ */
                            jsx(Text, { variant: "headingMd", as: "h2", children: "Log in" }),
                            /* @__PURE__ */
                            jsx(
                                TextField, {
                                    type: "text",
                                    name: "shop",
                                    label: "Shop domain",
                                    helpText: "example.myshopify.com",
                                    value: shop,
                                    onChange: setShop,
                                    autoComplete: "on",
                                    error: errors.shop
                                }
                            ),
                            /* @__PURE__ */
                            jsx(Button, { submit: true, children: "Log in" })
                        ]
                    })
                })
            })
        })
    });
}
const route3 = /* @__PURE__ */ Object.freeze( /* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    action: action$1,
    default: Auth,
    links: links$1,
    loader: loader$4
}, Symbol.toStringTag, { value: "Module" }));
const loader$3 = async({ request }) => {
    await authenticate.admin(request);
    // const response = await fetch("https://belgiumdia.com/api/DeveloperAPI?APIKEY=134981956a7be967bf4a198e5bfccf4059085cf9dd4d");
    const response = await fetch("https://fakestoreapi.com/products?limit=5");
    const products = await response.json();
    return json({ products });
};

function Products$1() {
    const { products } = useLoaderData$1();
    return /* @__PURE__ */ jsxs("div", {
        children: [
            /* @__PURE__ */
            jsx("h1", { children: "Products from server index" }),
            /* @__PURE__ */
            jsx("ul", { children: products.map((product, index2) => /* @__PURE__ */ jsx("li", { children: product.name }, index2)) })
        ]
    });
}
const route4 = /* @__PURE__ */ Object.freeze( /* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: Products$1,
    loader: loader$3
}, Symbol.toStringTag, { value: "Module" }));
const action = async({ request }) => {
    const { topic, shop, session, admin } = await authenticate.webhook(request);
    if (!admin && topic !== "SHOP_REDACT") {
        throw new Response();
    }
    switch (topic) {
        case "APP_UNINSTALLED":
            if (session) {
                await prisma.session.deleteMany({ where: { shop } });
            }
            break;
        case "CUSTOMERS_DATA_REQUEST":
        case "CUSTOMERS_REDACT":
        case "SHOP_REDACT":
        default:
            throw new Response("Unhandled webhook topic", { status: 404 });
    }
    throw new Response();
};
const route5 = /* @__PURE__ */ Object.freeze( /* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    action
}, Symbol.toStringTag, { value: "Module" }));
const loader$2 = async({ request }) => {
    await authenticate.admin(request);
    return null;
};
const route6 = /* @__PURE__ */ Object.freeze( /* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
const index = "_index_1hqgz_1";
const heading = "_heading_1hqgz_21";
const text = "_text_1hqgz_23";
const content = "_content_1hqgz_43";
const form = "_form_1hqgz_53";
const label = "_label_1hqgz_69";
const input = "_input_1hqgz_85";
const button = "_button_1hqgz_93";
const list = "_list_1hqgz_101";
const styles = {
    index,
    heading,
    text,
    content,
    form,
    label,
    input,
    button,
    list
};
const loader$1 = async({ request }) => {
    const url = new URL(request.url);
    if (url.searchParams.get("shop")) {
        throw redirect(`/app?${url.searchParams.toString()}`);
    }
    return json({ showForm: Boolean(login) });
};

function App() {
    const { showForm } = useLoaderData$1();
    return /* @__PURE__ */ jsx("div", {
        className: styles.index,
        children: /* @__PURE__ */ jsxs("div", {
            className: styles.content,
            children: [
                /* @__PURE__ */
                jsx("h1", { className: styles.heading, children: "A short heading about [your app]" }),
                /* @__PURE__ */
                jsx("p", { className: styles.text, children: "A tagline about [your app] that describes your value proposition." }),
                showForm && /* @__PURE__ */ jsxs(Form, {
                    className: styles.form,
                    method: "post",
                    action: "/auth/login",
                    children: [
                        /* @__PURE__ */
                        jsxs("label", {
                            className: styles.label,
                            children: [
                                /* @__PURE__ */
                                jsx("span", { children: "Shop domain" }),
                                /* @__PURE__ */
                                jsx("input", { className: styles.input, type: "text", name: "shop" }),
                                /* @__PURE__ */
                                jsx("span", { children: "e.g: my-shop-domain.myshopify.com" })
                            ]
                        }),
                        /* @__PURE__ */
                        jsx("button", { className: styles.button, type: "submit", children: "Log in" })
                    ]
                }),
                /* @__PURE__ */
                jsxs("ul", {
                    className: styles.list,
                    children: [
                        /* @__PURE__ */
                        jsxs("li", {
                            children: [
                                /* @__PURE__ */
                                jsx("strong", { children: "Product feature" }),
                                ". Some detail about your feature and its benefit to your customer."
                            ]
                        }),
                        /* @__PURE__ */
                        jsxs("li", {
                            children: [
                                /* @__PURE__ */
                                jsx("strong", { children: "Product feature" }),
                                ". Some detail about your feature and its benefit to your customer."
                            ]
                        }),
                        /* @__PURE__ */
                        jsxs("li", {
                            children: [
                                /* @__PURE__ */
                                jsx("strong", { children: "Product feature" }),
                                ". Some detail about your feature and its benefit to your customer."
                            ]
                        })
                    ]
                })
            ]
        })
    });
}
const route7 = /* @__PURE__ */ Object.freeze( /* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: App,
    loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{ rel: "stylesheet", href: polarisStyles }];
const loader = async() => {
    try {
        const response = await fetch("https://fakestoreapi.com/products?limit=5");
        const data = await response.json();
        console.log(data);
        return json({ products: Array.isArray(data.products) ? data.products : [] });
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return json({ products: [] });
    }
};

function Products() {
    const { products } = useLoaderData$1();
    if (!Array.isArray(products)) {
        return /* @__PURE__ */ jsx("div", { children: "Error: Products data is not in the expected format." });
    }
    return /* @__PURE__ */ jsxs("div", {
        children: [
            /* @__PURE__ */
            jsx("h1", { children: "Products from server index-4" }),
            /* @__PURE__ */
            jsx("ul", { children: products.map((product, index2) => /* @__PURE__ */ jsx("li", { children: product.name }, index2)) })
        ]
    });
}

function ErrorBoundary() {
    return /* @__PURE__ */ jsxs("div", {
        children: [
            "Error occurred: ",
            useRouteError().message
        ]
    });
}
const headers = (headersArgs) => {
    return headersArgs;
};
const route8 = /* @__PURE__ */ Object.freeze( /* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    ErrorBoundary,
    default: Products,
    headers,
    links,
    loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-DYHAYLbI.js", "imports": ["/assets/jsx-runtime-BZty_edN.js", "/assets/index-N2MpLrGy.js", "/assets/components-Ch1g0XRg.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-CPeSjM0S.js", "imports": ["/assets/jsx-runtime-BZty_edN.js", "/assets/index-N2MpLrGy.js", "/assets/components-Ch1g0XRg.js", "/assets/styles-BPtKC6Q9.js"], "css": [] }, "routes/app.additional": { "id": "routes/app.additional", "parentId": "routes/app", "path": "additional", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/app.additional-BXwnsEkm.js", "imports": ["/assets/jsx-runtime-BZty_edN.js", "/assets/index-N2MpLrGy.js", "/assets/Page-B9N0nQa-.js"], "css": [] }, "routes/app._index": { "id": "routes/app._index", "parentId": "routes/app", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/app._index-CkGGZaIY.js", "imports": ["/assets/jsx-runtime-BZty_edN.js"], "css": [] }, "routes/auth.login": { "id": "routes/auth.login", "parentId": "root", "path": "auth/login", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-D0dbcD-s.js", "imports": ["/assets/jsx-runtime-BZty_edN.js", "/assets/index-N2MpLrGy.js", "/assets/styles-BPtKC6Q9.js", "/assets/components-Ch1g0XRg.js", "/assets/Page-B9N0nQa-.js"], "css": [] }, "routes/products": { "id": "routes/products", "parentId": "root", "path": "products", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/products-ZjQYmAXX.js", "imports": ["/assets/jsx-runtime-BZty_edN.js", "/assets/index-N2MpLrGy.js", "/assets/components-Ch1g0XRg.js"], "css": [] }, "routes/webhooks": { "id": "routes/webhooks", "parentId": "root", "path": "webhooks", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/webhooks-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/auth.$": { "id": "routes/auth.$", "parentId": "root", "path": "auth/*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/auth._-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-BgPf7wGu.js", "imports": ["/assets/jsx-runtime-BZty_edN.js", "/assets/index-N2MpLrGy.js", "/assets/components-Ch1g0XRg.js"], "css": ["/assets/route-Qq2qOeDq.css"] }, "routes/app": { "id": "routes/app", "parentId": "root", "path": "app", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/app-B2qfkz_L.js", "imports": ["/assets/jsx-runtime-BZty_edN.js", "/assets/index-N2MpLrGy.js", "/assets/styles-BPtKC6Q9.js", "/assets/components-Ch1g0XRg.js"], "css": [] } }, "url": "/assets/manifest-153d5334.js", "version": "153d5334" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false, "unstable_singleFetch": false, "unstable_lazyRouteDiscovery": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
    "root": {
        id: "root",
        parentId: void 0,
        path: "",
        index: void 0,
        caseSensitive: void 0,
        module: route0
    },
    "routes/app.additional": {
        id: "routes/app.additional",
        parentId: "routes/app",
        path: "additional",
        index: void 0,
        caseSensitive: void 0,
        module: route1
    },
    "routes/app._index": {
        id: "routes/app._index",
        parentId: "routes/app",
        path: void 0,
        index: true,
        caseSensitive: void 0,
        module: route2
    },
    "routes/auth.login": {
        id: "routes/auth.login",
        parentId: "root",
        path: "auth/login",
        index: void 0,
        caseSensitive: void 0,
        module: route3
    },
    "routes/products": {
        id: "routes/products",
        parentId: "root",
        path: "products",
        index: void 0,
        caseSensitive: void 0,
        module: route4
    },
    "routes/webhooks": {
        id: "routes/webhooks",
        parentId: "root",
        path: "webhooks",
        index: void 0,
        caseSensitive: void 0,
        module: route5
    },
    "routes/auth.$": {
        id: "routes/auth.$",
        parentId: "root",
        path: "auth/*",
        index: void 0,
        caseSensitive: void 0,
        module: route6
    },
    "routes/_index": {
        id: "routes/_index",
        parentId: "root",
        path: void 0,
        index: true,
        caseSensitive: void 0,
        module: route7
    },
    "routes/app": {
        id: "routes/app",
        parentId: "root",
        path: "app",
        index: void 0,
        caseSensitive: void 0,
        module: route8
    }
};
export {
    serverManifest as assets,
    assetsBuildDirectory,
    basename,
    entry,
    future,
    isSpaMode,
    mode,
    publicPath,
    routes
};